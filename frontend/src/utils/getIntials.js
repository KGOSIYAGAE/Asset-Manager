export const getIntials = (userName) => {
  if (!userName) {
    return "Null";
  }

  let names = userName.split(" ");
  let initials = "";

  for (let i = 0; i < names.length; i++) {
    if (i < 2) {
      initials = initials + names[i].charAt(0);
    }
  }

  return initials;
};
