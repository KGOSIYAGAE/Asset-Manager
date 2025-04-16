export const handleTimeStamp = (timestamp) => {
  if (timestamp) {
    const newDate = timestamp.split("T")[0];
    return newDate;
  }
};
