export const getLoggedInUser = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const user = {
    fullName: currentUser?.fullName,
    id: currentUser?.id,
    role: currentUser?.role,
    token: currentUser?.token,
  };
  return user;
};

export const hasPermission = (permission) => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const userRole = currentUser?.role;

  const ROLES = {
    support_admin: {
      can: ["create", "edit", "delete", "view", "support-dash", "bulk-create", "export", "assign"],
    },
    support_technician: {
      can: ["create", "edit", "view", "support-dash", "assign"],
    },
    networks_admin: {
      can: ["create", "edit", "delete", "view", "networks-dash", "bulk-create", "export", "assign"],
    },
    networks_technician: {
      can: ["create", "edit", "view", "networks-dash", "assign"],
    },
    editor: {
      can: ["create", "edit", "view", "assign"],
    },
    viewer: {
      can: ["view"],
    },
  };

  const permissions = ROLES[userRole].can;

  if (permissions.includes(permission)) {
    return true;
  }

  return false;
};
