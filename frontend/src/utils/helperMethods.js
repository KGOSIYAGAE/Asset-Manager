//import { assignReleaseUser } from "../services/api/devices/Device.Api";

//Generate End date for permanent staff members
export const generateReturnDate = (startDate) => {
  const years = 3;

  const date = new Date(startDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const yearsFromNow = date.getFullYear() + years;
  const endDate = `${yearsFromNow}-${month}-${day}`;

  return endDate;
};

//Release User from device on Delete
export const releaseOnDelete = (id, setShowToast) => {
  const data = {
    status: "Available",
    loanStartDate: "None",
    userId: "None",
    location: "COO1 - Datacenter",
  };

  //assignReleaseUser(id, data, setShowToast);
};

//Get todays date
export const getTodayDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let finalMonth;

  if (month < 10) {
    finalMonth = "0" + month.toString();
  } else {
    finalMonth = month;
  }

  return `${year}-${finalMonth}-${day}`;
};

export const getMonthName = (month) => {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
};
