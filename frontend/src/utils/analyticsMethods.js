import { facultyCourse } from "./course";

//Get All devices based on
export const getDevicesStatsByMake = (devices) => {
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

  return { LENOVO_LAPTOPS, HP_LAPTOPS };
};

//Get Stats of devices based on status
export const getDevicesStatusSummary = (devices) => {
  let availableInStock = 0;
  let assignedUsers = 0;
  let onMaintenance = 0;
  let markedLost = 0;

  const { LENOVO_LAPTOPS, HP_LAPTOPS } = getDevicesStatsByMake(devices);

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
    available: 0,
    assigned: 0,
    maintenance: 0,
    lost: 0,
  };

  return { lenovoLaptopStats, hpLaptopStats, dellLaptopStats };
};

//Get Stats of devices based on condition
export const getDevicesConditionSummary = (devices) => {
  let newLaptops = 0;
  let secondHandLaptops = 0;
  let faultyLaptops = 0;
  let scrapedLaptops = 0;
  let returnLaptops = 0;

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
////////////////////////////////////////////////////////

//Get lenovo laptops by model
export const getLenovoStatsByModel = (devices) => {
  let lenovo_E16 = 0; //Lenovo ThinkPads E16
  let lenovo_V15 = 0; //Lenovo V15

  const { LENOVO_LAPTOPS } = getDevicesStatsByMake(devices);

  for (let i = 0; i < LENOVO_LAPTOPS?.length; i++) {
    if (LENOVO_LAPTOPS[i].model === "ThinkPad E16") {
      lenovo_E16 += 1;
    }

    if (LENOVO_LAPTOPS[i].model === "V15 G5 IRL") {
      lenovo_V15 += 1;
    }
  }

  return [lenovo_E16, lenovo_V15];
};
////////////////////////////////////////////////////////

//Get hp laptops by model
export const getHPStatsByModel = (devices) => {
  let HP_255_G8 = 0; //HP 255 G8
  let HP_255_G9 = 0; //HP 255 G9
  let HP_455_G8 = 0; //HP 455 G8
  let HP_455_G9 = 0; //HP 455 G9
  let HP_455_G10 = 0; //HP 455 G10

  const { HP_LAPTOPS } = getDevicesStatsByMake(devices);

  for (let i = 0; i < HP_LAPTOPS?.length; i++) {
    if (HP_LAPTOPS[i].model === "255 G8") {
      HP_255_G8 += 1;
    }
    if (HP_LAPTOPS[i].model === "255 G9") {
      HP_255_G9 += 1;
    }
    if (HP_LAPTOPS[i].model === "455 G8") {
      HP_455_G8 += 1;
    }
    if (HP_LAPTOPS[i].model === "455 G9") {
      HP_455_G9 += 1;
    }
    if (HP_LAPTOPS[i].model === "455 G10") {
      HP_455_G10 += 1;
    }
  }

  return [HP_255_G8, HP_255_G9, HP_455_G8, HP_455_G9, HP_455_G10];
};
////////////////////////////////////////////////////////

//Get Faculty Stats

export const getFacultyStats = (students) => {
  let edu_stats = [];
  let ems_stats = [];
  let nas_stats = [];
  let hum_stats = [];

  for (let i = 0; i < students?.length; i++) {
    if (students[i].faculty_abbreviation === "EDU") {
      edu_stats.push(students[i]);
    }

    if (students[i].faculty_abbreviation === "EMS") {
      ems_stats.push(students[i]);
    }

    if (students[i].faculty_abbreviation === "NAS") {
      nas_stats.push(students[i]);
    }

    if (students[i].faculty_abbreviation === "HUM") {
      hum_stats.push(students[i]);
    }
  }

  return { edu_stats, ems_stats, nas_stats, hum_stats };
};
////////////////////////////////////////////////////////

//Get course stats by Faculty
export const getCourseStatsByFaculty = (students, facultyNumber) => {
  const { edu_stats, ems_stats, nas_stats, hum_stats } = getFacultyStats(students);
  let count = 0;

  const facultyNumbersByCourse = [];

  const facultyData = [nas_stats, edu_stats, ems_stats, hum_stats];

  for (let j = 0; j < facultyCourse[facultyNumber]?.coursesOfferd.length; j++) {
    count = 0;
    for (let i = 0; i < hum_stats.length; i++) {
      if (facultyData[facultyNumber][i]?.course_code === facultyCourse[facultyNumber]?.coursesOfferd[j]?.course_code) {
        count++;
      }
    }
    facultyNumbersByCourse.push(count);
  }

  return facultyNumbersByCourse;
};
////////////////////////////////////////////////////////

//Get Stats of devices based on condition
export const getDevicesCategorySummary = (devices) => {
  let laptops = 0;
  let desktops = 0;
  let allInOnes = 0;
  let monitors = 0;

  for (let i = 0; i < devices?.length; i++) {
    if (devices[i].category === "Laptop") {
      laptops += 1;
    }

    if (devices[i].category === "Desktop") {
      desktops += 1;
    }

    if (devices[i].category === "All In One") {
      allInOnes += 1;
    }

    if (devices[i].category === "Monitor") {
      monitors += 1;
    }
  }

  return { laptops, desktops, allInOnes, monitors };
};
////////////////////////////////////////////////////////
