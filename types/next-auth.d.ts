import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email : string | null;
      roleRelation: {
          id: string;
          label: string;
          priority: number;
      } | null
      username: string | null;
      roleRelation?: {
        id: string;
        label: string;
        priority: number;
      } | null;
    } & DefaultSession["user"];
  }

  interface User {
    roleRelation: {
        id: string;
        label: string;
        priority: number;
    } | null
    username?: string | null;
    theme?: string | null;
    accentColor?: string | null;
    roleRelation?: {
      id: string;
      label: string;
      priority: number;
    } | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    roleRelation: {
        id: string;
        label: string;
        priority: number;
    } | null
    username?: string | null;
    theme?: string | null;
    accentColor?: string | null;
    roleRelation?: {
      id: string;
      label: string;
      priority: number;
    } | null;
  }
}