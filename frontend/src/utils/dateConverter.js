const dateOnlyRegex = /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])))$/;

function parseDateString(dateString) {
  /*if (dateOnlyRegex.test(dateString)) {
    const utcDate = new Date(dateString);
    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    console.log("local: " + localDate);
    return localDate;
  }
  console.log(dateString);
  return new Date(dateString);*/
  const localDate = new Date(rawDate).toLocaleDateString("en-ZA", {
    timeZone: "Africa/Johannesburg",
  });
}

export const handleTimeStamp = (timestamp) => {
  if (timestamp) {
    const localDate = new Date(timestamp).toISOString().split("T")[0];

    return localDate;
  }
};

export const toIsoDate = (dateInput) => {
  return new Date(dateInput).toISOString();
};

export const handleTimeStampToText = (timestamp) => {
  if (timestamp) {
    const localDate = new Date(timestamp).toLocaleDateString("en-ZA", {
      timeZone: "Africa/Johannesburg",
    });

    return localDate;
  }
};

export const addOneDay = (dateStr) => {
  const localDate = new Date(dateStr).toISOString().split("T")[0];

  console.log(localDate);

  const [year, month, day] = localDate.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day + 1));

  console.log(date);

  return date.toISOString().split("T")[0];
};
