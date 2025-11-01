import { jwtDecode } from "jwt-decode";

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

//Cehck if user has permissions
export const hasPermission = (permission) => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const userRole = currentUser?.role;

  const ROLES = {
    support_admin: {
      can: ["create", "edit", "delete", "view", "support-dash", "view-logs", "bulk-create", "export", "assign"],
    },
    support_technician: {
      can: ["create", "edit", "view", "support-tech-dash", "assign"],
    },
    networks_admin: {
      can: ["create", "edit", "delete", "view", "networks-dash", "view-logs", "bulk-create", "export", "assign"],
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

//Check if token has expired
export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
