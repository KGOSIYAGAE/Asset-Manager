import { createRepair, updateRepair, updateRepairStatus } from "../services/api/repairs/Repairs.Api";
import { getLoggedInUser } from "./getLoggedInUser";

export const maintenaceTypesList = [
  {
    id: 1,
    name: "Preventive",
    description: "Scheduled maintenance performed regularly to prevent equipment failure and extend the lifespan of ICT assets.",
  },
  {
    id: 2,
    name: "Corrective",
    description: "Maintenance carried out to repair faults or restore a device after a failure has occurred.",
  },
  {
    id: 3,
    name: "Emergency",
    description: "Urgent maintenance required to resolve critical issues causing service disruption or downtime.",
  },
  {
    id: 4,
    name: "Predictive",
    description: "Maintenance scheduled based on device condition, diagnostics, or health monitoring to prevent future failures.",
  },
  {
    id: 5,
    name: "Software",
    description: "Maintenance involving operating systems, applications, drivers, firmware, security patches, and software updates.",
  },
  {
    id: 6,
    name: "Hardware",
    description: "Maintenance involving the repair, replacement, or servicing of physical hardware components.",
  },
  {
    id: 7,
    name: "Upgrade",
    description: "Enhancement of device performance through hardware or software upgrades.",
  },
  {
    id: 8,
    name: "Cleaning & Inspection",
    description: "Routine cleaning, inspection, and preventive checks to maintain optimal device performance.",
  },
  {
    id: 9,
    name: "Security",
    description: "Maintenance focused on protecting devices through antivirus updates, security patches, encryption, and access control.",
  },
  {
    id: 10,
    name: "Warranty",
    description: "Maintenance or repairs performed under the manufacturer's warranty agreement.",
  },
  {
    id: 11,
    name: "Vendor",
    description: "Maintenance performed by an external vendor, supplier, or authorized service provider.",
  },
  {
    id: 12,
    name: "Decommissioning",
    description: "The secure retirement of an ICT asset through data sanitization, disposal, recycling, or replacement.",
  },
];

export const filterItems = ["All", "New", "Awaiting Parts", "In Progress", "Ready For Collection", "Completed", "Overdue"];

export const repairStatusList = [
  {
    id: 1,
    name: "New",
    description: "The repair ticket has been newly logged in the system and is currently awaiting allocation to a technician.",
  },
  {
    id: 2,
    name: "Under Assesment",
    description: "Work in Progress. The device is currently on the workbench undergoing active diagnostic assessment or structural repairs.",
  },
  {
    id: 3,
    name: "Awaiting Parts",
    description: "The hardware fault has been isolated, and the repair is paused pending the delivery of required replacement components.",
  },
  {
    id: 4,
    name: "In Progress",
    description: "Work in Progress. The device is currently on the workbench undergoing active diagnostic assessment or structural repairs.",
  },
  {
    id: 5,
    name: "Testing",
    description: "Technical fixes are complete, and the asset is undergoing systematic functional testing to ensure baseline operational stability.",
  },
  {
    id: 6,
    name: "Ready For Collection",
    description: "The device is fully restored, validated, and placed in secure storage awaiting customer pick-up or dispatch.",
  },
  {
    id: 7,
    name: "Beyond Repair",
    description: "Structural or systemic failure where replacement component costs exceed the fair market value of the hardware asset.",
  },
  {
    id: 8,
    name: "Collected",
    description: "The asset has been successfully handed over to the user, payment processing is finalized, and the ticket history is archived.",
  },
  {
    id: 9,
    name: "Closed",
    description: "The asset has been successfully handed over to the user, payment processing is finalized, and the ticket history is archived.",
  },
];

export const handleCreateRepair = async (deviceId, repairType, repairDescription, technicianId, repairNotes, accessories, dislaimerAccepted, onSubmit, setShowToast) => {
  if (!deviceId) {
    return setShowToast({ isShown: true, type: "error", message: "Device not selected" });
  }

  if (!repairType) {
    return setShowToast({ isShown: true, type: "error", message: "Repair type not provided" });
  }

  if (!repairDescription) {
    return setShowToast({ isShown: true, type: "error", message: "Description not provided" });
  }

  if (!technicianId) {
    return setShowToast({ isShown: true, type: "error", message: "Technician not selected" });
  }

  const data = {
    deviceId,
    repairType,
    repairDescription,
    technicianId,
    repairNotes: repairNotes || null,
    accessories,
    current_status_id: 1,
    dislaimerAccepted,
  };

  const { response } = await createRepair(data);

  if (response.error) {
    console.log("Error");
    return;
  } else {
    setShowToast({ isShow: true, type: "success", message: response.message });
    return onSubmit();
  }
};

{
  /** */
}
export const handleUpdateRepairStatus = async (repairId, selectedStatus, OnSubmit, setShowToast) => {
  if (!repairId) {
    return setShowToast({ isShown: true, type: "error", message: "Device id not providing" });
  }

  if (!selectedStatus) {
    return setShowToast({ isShown: true, type: "error", message: "Status not selected" });
  }

  const status = repairStatusList.find((status) => status.name === selectedStatus);

  let data;

  const user = getLoggedInUser();

  if (selectedStatus === "Closed") {
    data = {
      repairId,
      statusId: status.id,
      closedBy: user?.id,
    };
  } else {
    data = {
      repairId,
      statusId: status.id,
    };
  }

  /* const data = {
    repairId,
    statusId: status.id,
  };*/

  const { error, message } = await updateRepairStatus(data, setShowToast);

  if (error) {
    //setShowToast()
    return setShowToast({ isShown: true, type: "error", message: message });
  }

  OnSubmit();
  return setShowToast({ isShown: true, type: "success", message: message });
};

export const handleUpdateRepair = async (repairId, repairType, repairDescription, technicianId, repairNotes, onSubmit, setShowToast) => {
  if (!repairId) {
    return setShowToast({ isShown: true, type: "error", message: "Device not selected" });
  }

  if (!repairType) {
    return setShowToast({ isShown: true, type: "error", message: "Repair type not provided" });
  }

  if (!repairDescription) {
    return setShowToast({ isShown: true, type: "error", message: "Description not provided" });
  }

  if (!technicianId) {
    return setShowToast({ isShown: true, type: "error", message: "Technician not selected" });
  }

  const data = {
    repairId,
    repairType,
    repairDescription,
    technicianId,
    repairNotes: repairNotes || null,
  };

  const { response } = await updateRepair(repairId, data);

  if (response.error) {
    setShowToast({ isShown: true, type: "error", message: response.message });
    return;
  } else {
    console.log(response);
    setShowToast({ isShown: true, type: "success", message: response.message });

    return onSubmit();
  }
};
