export const getIntials = (fullName) => {
  if (!fullName) {
    return "Null";
  }

  let names = fullName.split(" ");
  let initials = "";

  for (let i = 0; i < names.length; i++) {
    if (i < 2) {
      initials = initials + names[i].charAt(0);
    }
  }

  return initials;
};
