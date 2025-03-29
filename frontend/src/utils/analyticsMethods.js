//Get Stats of devices based on status
export const getDevicesStatusSummary = (devices) => {
  let availableInStock = 0;
  let assignedUsers = 0;
  let onMaintenance = 0;
  let markedLost = 0;

  let LENOVO_LAPTOPS = [];
  let HP_LAPTOPS = [];
  let DELL_LAPTOPS = [];
  let APPLE_LAPTOPS = [];
  let MERCER_LAPTOPS = [];

  //Slipt laptop based on make
  for (let i = 0; i < devices?.length; i++) {
    if (devices[i].make === "Lenovo") {
      LENOVO_LAPTOPS.push(devices[i]);
    } else if (devices[i].make === "HP") {
      HP_LAPTOPS.push(devices[i]);
    }
  }

  //get stats for lenovo laptops
  for (let i = 0; i < LENOVO_LAPTOPS?.length; i++) {
    if (LENOVO_LAPTOPS[i].status === "Available") {
      availableInStock += 1;
    }

    if (LENOVO_LAPTOPS[i].status === "Assigned") {
      assignedUsers += 1;
    }

    if (LENOVO_LAPTOPS[i].status === "Maintenance") {
      onMaintenance += 1;
    }

    if (LENOVO_LAPTOPS[i].status === "Lost") {
      markedLost += 1;
    }
  }

  //set lenovo laptops
  const lenovoLaptopStats = {
    available: availableInStock,
    assigned: assignedUsers,
    maintenance: onMaintenance,
    lost: markedLost,
  };

  //Clear variables
  availableInStock = 0;
  assignedUsers = 0;
  onMaintenance = 0;
  markedLost = 0;

  //get stats for lenovo laptops
  for (let i = 0; i < HP_LAPTOPS?.length; i++) {
    if (HP_LAPTOPS[i].status === "Available") {
      availableInStock += 1;
    }

    if (HP_LAPTOPS[i].status === "Assigned") {
      assignedUsers += 1;
    }

    if (HP_LAPTOPS[i].status === "Maintenance") {
      onMaintenance += 1;
    }

    if (HP_LAPTOPS[i].status === "Lost") {
      markedLost += 1;
    }
  }

  //set hp laptops
  const hpLaptopStats = {
    available: availableInStock,
    assigned: assignedUsers,
    maintenance: onMaintenance,
    lost: markedLost,
  };

  //set dell laptops
  const dellLaptopStats = {
    available: 200,
    assigned: 400,
    maintenance: 50,
    lost: 10,
  };

  return { lenovoLaptopStats, hpLaptopStats, dellLaptopStats };
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
