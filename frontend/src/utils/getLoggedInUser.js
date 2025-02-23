export const getLoggedInUser = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const user = {
    username: currentUser?.username,
    role: currentUser?.role,
    token: currentUser?.token,
  };
  return user;
};

export const userPrevilages = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const userRole = currentUser?.role;

  switch (userRole) {
    case "global_admin":
      return false;
    case "admin":
      return false;
    default:
      return true;
  }
};
