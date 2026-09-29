import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import type { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { loginLimiter } from "@/lib/rate-limit";
import { config } from "@/lib/config";
import { logger } from "@/lib/logger";
import { audit } from "@/lib/audit";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
    
    CredentialsProvider({
      name: "Credentials",
      
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        
        password: {
          label: "Mot de passe",
          type: "password",
        },
        
        turnstileToken: {
          label: "Turnstile",
          type: "text",
        },
      },
      
      async authorize(credentials, req) {
        const email = credentials?.email;
        const userAgent =
          req.headers?.["user-agent"] ??
          "unknown";

        const ip =
          req.headers?.["x-forwarded-for"] ??
          req.headers?.["x-real-ip"] ??
          "unknown";
        
        if (
          typeof email !==
          "string"
        ) {
          logger.warn(
            "Login failed",
            {
              email,
              reason:
              "invalid_email",
            }
          );
          
          return null;
        }
        
        const {
          success,
        } =
        await loginLimiter.limit(
          `login:${email}`
        );
        
        if (!success) {
          await audit({
            action:
            "LOGIN_RATE_LIMIT",
            
            metadata: {
              email,
            },
          });
          
          throw new Error("RATE_LIMIT");
        }
        
        const turnstileToken =
        credentials?.turnstileToken;
        
        if (
          typeof turnstileToken !==
          "string"
        ) {
          logger.warn(
            "Login failed",
            {
              email,
              reason:
              "invalid_token",
            }
          );
          
          return null;
        }
        
        const turnstileValid =
        await verifyTurnstileToken(
          turnstileToken
        );
        
        if (!turnstileValid) {
          logger.warn(
            "Login failed",
            {
              email,
              reason:
              "turnstile_failed",
            }
          );
          
          return null;
        }
        
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          logger.warn(
            "Login failed",
            {
              email,
              reason:
              "invalid_credentials",
            }
          );
          
          return null;
        }
        
        const user =
        await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },

          include: {
              roleRelation: {
                  select: {
                      id: true,
                      label: true,
                      priority: true,
                  },
              },
          },
        });
        
        if (!user) {
          logger.warn(
            "Login failed",
            {
              email,
              reason: "user_not_found",
            }
          );
          
          return null;
        }

        if (!user.isActive) {
          logger.warn(
            "Login failed",
            {
              email,
              reason:
                "account_disabled",
            }
          );

          return null;
        }

        if (user.suspendedAt) {
          logger.warn(
            "Login failed",
            {
              email,
              reason:
                "account_suspended",
            }
          );

          return null;
        }

        if (
          user.lockedUntil &&
          user.lockedUntil > new Date()
        ) {
          logger.warn(
            "Login failed",
            {
              email,
              reason:
                "account_locked",
            }
          );

          return null;
        }
        
        if (!user.passwordHash) {
          logger.warn(
            "Login failed",
            {
              email,
              reason:
              "no_password_hash",
            }
          );
          
          return null;
        }
        
        if (!user.emailVerified) {
          logger.warn(
            "Login failed",
            {
              email,
              reason:
              "email_not_verified",
            }
          );
          return null;
          //throw new Error("EMAIL_NOT_VERIFIED");
        }
        
        const passwordMatches =
        await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        
        if (!passwordMatches) {
          logger.warn(
            "Login failed",
            {
              email,
              reason:
              "invalid_password",
            }
          );
          
          return null;
        }
        
        logger.info(
          "Login success",
          {
            userId: user.id,
            email,
          }
        );
        
        await audit({
          userId: user.id,
          
          action:
          "LOGIN_SUCCESS",
        });

        await prisma.loginHistory.create({
          data: {
            userId: user.id,
            ip,
            userAgent,
          },
        });
        
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          roleRelation: user.roleRelation,
          theme: user.theme,
          accentColor: user.accentColor,
          name: user.username ??  user.email,
        };
      },
    }),
  ],
  
  callbacks: {
    async jwt({
      token,
      user,
    }) {
      
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.theme = user.theme;
        token.accentColor = user.accentColor;
        token.roleRelation = user.roleRelation;
      }
      
      return token;
    },
    
    async session({
      session,
      token,
    }) {
      if (!token.sub) {
        return session;
      }

      const user =
        await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
          select: {
            id: true,
            email: true,
            username: true,
            roleRelation: {
              select: {
                id: true,
                label: true,
                priority: true,
              },
            }
          },
        });

      if (!user) {
        throw new Error(
          "USER_NOT_FOUND"
        );
      }

      session.user = {
        ...session.user,
        id: user.id,
        email: user.email,
        username: user.username,
        roleRelation: user.roleRelation,
      };
      
      return session;
    },
  },
  
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
};

const handler =
NextAuth(authOptions);

export { handler as GET, handler as POST };