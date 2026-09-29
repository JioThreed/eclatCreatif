
export type AdminUser = {
  id: string;
  email: string | null;
  username: string | null;
  roleRelation: {
      id: string;
      label: string;
      priority: number;
  } | null;

  createdAt: Date;
  updatedAt: Date;

  emailVerified: Date | null;

  failedLoginAttempts: number;
  lockedUntil: Date | null;

  isActive: boolean;

  suspendedById: string | null;
  suspendedAt: Date | null;
  suspendedReason: string | null;
};

export type AdminLoginHistory = {
  id: string;
  ip: string | null;
  userAgent: string | null;
  createdAt: Date;
};

export type AdminAuditLog = {
  id: string;
  action: string;
  ip: string | null;
  metadata: unknown;
  createdAt: Date;
};