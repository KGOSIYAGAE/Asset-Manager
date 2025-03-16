//Get Stats of devices based on status
export const getDevicesStatusSummary = (devices) => {
  let availableInStock = 0;
  let assignedUsers = 0;
  let onMaintenance = 0;
  let markedLost = 0;

  for (let i = 0; i < devices?.length; i++) {
    if (devices[i].status === "Available") {
      availableInStock += 1;
    }

    if (devices[i].status === "Assigned") {
      assignedUsers += 1;
    }

    if (devices[i].status === "Maintenance") {
      onMaintenance += 1;
    }

    if (devices[i].status === "Lost") {
      markedLost += 1;
    }
  }

  return { availableInStock, assignedUsers, onMaintenance, markedLost };
};

//Get Stats of devices based on condition
export const getDevicesConditionSummary = (devices) => {
  let newLaptops = 0;
  let secondHandLaptops = 0;
  let faultyLaptops = 0;
  let scrapedLaptops = 0;

  for (let i = 0; i < devices?.length; i++) {
    if (devices[i].device_condition === "New") {
      newLaptops += 1;
    }

    if (devices[i].device_condition === "Used") {
      secondHandLaptops += 1;
    }

    if (devices[i].device_condition === "Faulty") {
      faultyLaptops += 1;
    }

    if (devices[i].device_condition === "Scrap") {
      scrapedLaptops += 1;
    }
  }

  return { newLaptops, secondHandLaptops, faultyLaptops, scrapedLaptops };
};

//Get Stats of devices based models
export const getDevicesStatsByModel = (devices) => {
  let lenovoLaptops = 0;
  let hpLaptops = 0;
  let dellLaptops = 0;

  for (let i = 0; i < devices?.length; i++) {
    if (devices[i].make === "Lenovo") {
      lenovoLaptops += 1;
    }

    if (devices[i].make === "HP") {
      hpLaptops += 1;
    }

    if (devices[i].make === "Dell") {
      dellLaptops += 1;
    }
  }

  return { lenovoLaptops, hpLaptops, dellLaptops };
};
