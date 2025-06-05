export const getLoggedInUser = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const user = {
    fullName: currentUser?.fullName,
    role: currentUser?.role,
    token: currentUser?.token,
  };
  return user;
};

export const hasPermission = (permission) => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const userRole = currentUser?.role;

  const ROLES = {
    admin: {
      can: ["create", "edit", "delete", "view", "administration", "bulk-create", "export", "assign"],
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
