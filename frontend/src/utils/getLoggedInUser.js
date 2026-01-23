import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "./navigate";
//const navigate = useNavigate();

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

// List of roles
export const rolesList = [
  {
    id: 0,
    name: "support_admin",
    can: `"create", "edit", "delete", "view", "support-dash", "view-logs", "bulk-create", "export", "assign", "approve"`,
  },
  {
    id: 1,
    name: "support_technician",
    can: `"create", "edit", "view", "support-tech-dash", "assign", "print`,
  },
  {
    id: 2,
    name: "support_intern",
    can: `"view", "support-tech-dash", "assign"`,
  },
];

//Cehck if user has permissions
export const hasPermission = (permission) => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const userRole = currentUser?.role;

  const ROLES = {
    support_admin: {
      can: ["create", "edit", "delete", "view", "support-dash", "view-logs", "bulk-create", "export", "assign", "approve", "manage-roles", "print"],
    },
    support_technician: {
      can: ["create", "edit", "view", "support-tech-dash", "assign", "print"],
    },
    support_intern: {
      can: ["view", "support-tech-dash", "assign"],
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

  if (!userRole) {
    console.log("You do not have access to the system");

    return navigateTo("/No-Access");
  }

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
