export type RoleLike = {
  priority: number;
};

export function compareRoles(
  currentRole: RoleLike,
  targetRole: RoleLike
) {
  if (
    currentRole.priority <
    targetRole.priority
  ) {
    return -1;
  }

  if (
    currentRole.priority >
    targetRole.priority
  ) {
    return 1;
  }

  return 0;
}

export function isSuperAdmin(
  role: RoleLike
) {
  return role.priority === 0;
}

export function isAdminRole(
  role: RoleLike
) {
  return role.priority <= 1;
}

export function canManageRole(
  currentRole: RoleLike,
  targetRole: RoleLike
) {
  return (
    compareRoles(
      currentRole,
      targetRole
    ) <= 0
  );
}

export function canAssignRole(
  currentRole: RoleLike,
  roleToAssign: RoleLike
) {
  return (
    compareRoles(
      currentRole,
      roleToAssign
    ) <= 0
  );
}

export function canDeleteRole(
  currentRole: RoleLike,
  targetRole: RoleLike
) {
  return (
    compareRoles(
      currentRole,
      targetRole
    ) < 0
  );
}

export function canEditRole(
  currentRole: RoleLike,
  targetRole: RoleLike
) {
  return (
    compareRoles(
      currentRole,
      targetRole
    ) <= 0
  );
}

export function canEditPermissions(
  currentRole: RoleLike,
  targetRole: RoleLike
) {
  return (
    compareRoles(
      currentRole,
      targetRole
    ) <= 0
  );
}

export function canManageUser(
  currentRole: RoleLike,
  targetRole: RoleLike
) {
  return (
    compareRoles(
      currentRole,
      targetRole
    ) <= 0
  );
}

export function canSuspendUser(
  currentRole: RoleLike,
  targetRole: RoleLike
) {
  return canManageUser(
    currentRole,
    targetRole
  );
}

export function canDisableUser(
  currentRole: RoleLike,
  targetRole: RoleLike
) {
  return canManageUser(
    currentRole,
    targetRole
  );
}

export function canUnlockUser(
  currentRole: RoleLike,
  targetRole: RoleLike
) {
  return canManageUser(
    currentRole,
    targetRole
  );
}