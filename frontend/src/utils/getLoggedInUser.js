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
    name: "super_admin",
    can: ` "create",
      "edit",
      "delete",
      "view",
      "support-admin-dash",
      "view-transactions",
      "export",
      "import",
      "assign",
      "approve",
      "release",
      "loan",
      "manage-roles",
      "print",
      "create-repair",
      "assign-repair",
      "view-upgrades",
      "view-repairs",
      "signature",
      "view-due-return"`,
  },
  {
    id: 1,
    name: "support_admin",
    can: ` "create",
      "edit",
      "delete",
      "view",
      "support-admin-dash",
      "view-transactions",
      "export",
      "import",
      "assign",
      "approve",
      "release",
      "loan",
      "manage-roles",
      "print",
      "create-repair",
      "assign-repair",
      "view-upgrades",
      "view-repairs",
      "signature",
      "view-due-return"`,
  },
  {
    id: 2,
    name: "support_technician",
    can: `"create",
      "edit",
      "view",
      "support-tech-dash",
      "assign",
      "loan",
      "release",
      "import",
      "print",
      "view-transactions",
      "create-repair",
      "view-repairs",
      "view-upgrades",
      "signature",
      "view-due-return"`,
  },
  {
    id: 3,
    name: "support_intern",
    can: `"view", "support-intern-dash", "create-repair", "view-repairs"`,
  },
];

export const ROLES = {
  super_admin: {
    can: [
      "create",
      "edit",
      "delete",
      "view",
      "support-admin-dash",
      "view-transactions",
      "export",
      "import",
      "assign",
      "approve",
      "release",
      "loan",
      "manage-roles",
      "print",
      "create-repair",
      "assign-repair",
      "view-upgrades",
      "view-repairs",
      "signature",
      "view-due-return",
    ],
  },
  support_admin: {
    can: [
      "create",
      "edit",
      "delete",
      "view",
      "support-admin-dash",
      "view-transactions",
      "export",
      "import",
      "assign",
      "approve",
      "release",
      "loan",
      "manage-roles",
      "print",
      "create-repair",
      "assign-repair",
      "view-upgrades",
      "view-repairs",
      "signature",
      "view-due-return",
    ],
  },
  support_technician: {
    can: [
      "create",
      "edit",
      "view",
      "support-tech-dash",
      "assign",
      "loan",
      "release",
      "import",
      "print",
      "view-transactions",
      "create-repair",
      "view-repairs",
      "view-upgrades",
      "signature",
      "view-due-return",
    ],
  },
  support_servicedesk: {
    can: [
      "create",
      "edit",
      "view",
      "support-Service-dash",
      "assign",
      "loan",
      "release",
      "import",
      "print",
      "view-transactions",
      "create-repair",
      "assign-repair",
      "view-repairs",
      "view-upgrades",
      "signature",
    ],
  },
  support_intern: {
    can: ["view", "support-intern-dash", "create-repair", "view-repairs"],
  },
  viewer: {
    can: ["view"],
  },
  /*networks_admin: {
      can: ["create", "edit", "delete", "view", "networks-dash", "view-logs", "bulk-create", "export", "assign", "create-repair"],
    },
    networks_technician: {
      can: ["create", "edit", "view", "networks-dash", "assign"],
    },
    editor: {
      can: ["create", "edit", "view", "assign"],
    },
    */
};

//Cehck if user has permissions
export const hasPermission = (permission) => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const userRole = currentUser?.role;

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
