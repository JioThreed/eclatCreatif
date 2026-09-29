import { prisma } from "@/lib/prisma";

type AuditAction =
  | "REGISTER"
  | "EMAIL_VERIFIED"
  | "EMAIL_VERIFICATION_SENT"
  | "LOGIN_SUCCESS"
  | "LOGIN_RATE_LIMIT"
  | "LOGOUT"
  | "LOGOUT_ALL"
  | "USER_SOFT_DELETED"
  | "USER_RESTORED"
  | "USER_HARD_DELETED"
  | "USER_ENABLED"
  | "USER_DISABLED"
  | "USER_ROLE_UPDATED"
  | "USER_SUSPENDED"
  | "USER_UNSUSPENDED"
  | "ROLE_CREATED"
  | "ROLE_UPDATED"
  | "ROLE_DELETED"
  | "SESSION_REVOKED"
  | "PASSWORD_RESET"
  | "PASSWORD_RESET_REQUEST"
  | "PASSWORD_CHANGED"
  | "PROFILE_UPDATED"
  | "APPEARANCE_UPDATED"
  | "ACCOUNT_DELETED"
  | "TWO_FACTOR_ENABLED"
  | "TWO_FACTOR_DISABLED";

type AuditData = {
  userId?: string;
  action: AuditAction;
  ip?: string;
  metadata?: unknown;
};

export async function audit(
  data: AuditData
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        ip: data.ip,
        metadata:
          data.metadata as object,
      },
    });
  } catch (error) {
    console.error(
      "Audit log failed",
      error
    );
  }
}