import { createRepair } from "../services/api/repairs/Repairs.Api";

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

export const repairStatusList = [
  {
    id: 1,
    name: "New",
    description: "The repair ticket has been newly logged in the system and is currently awaiting allocation to a technician.",
  },
  {
    id: 2,
    name: "In progress",
    description: "Work in Progress. The device is currently on the workbench undergoing active diagnostic assessment or structural repairs.",
  },
  {
    id: 3,
    name: "Awaiting Parts",
    description: "The hardware fault has been isolated, and the repair is paused pending the delivery of required replacement components.",
  },
  {
    id: 4,
    name: "Quality Control",
    description: "Technical fixes are complete, and the asset is undergoing systematic functional testing to ensure baseline operational stability.",
  },
  {
    id: 5,
    name: "Ready for Collection",
    description: "The device is fully restored, validated, and placed in secure storage awaiting customer pick-up or dispatch.",
  },
  {
    id: 6,
    name: "Completed",
    description: "The asset has been successfully handed over to the user, payment processing is finalized, and the ticket history is archived.",
  },
  {
    id: 7,
    name: "Beyond Economic Repair",
    description: "Structural or systemic failure where replacement component costs exceed the fair market value of the hardware asset.",
  },
];

export const handleCreateRepair = async (deviceId, repairType, repairDescription, technicianId, repairNotes, repairStatus, setShowToast, onSubmit) => {
  if (!deviceId) {
    return setShowToast({ isShow: true, type: "error", message: "Device not selected" });
  }

  if (!repairType) {
    return setShowToast({ isShow: true, type: "error", message: "Repair type not provided" });
  }

  if (!repairDescription) {
    return setShowToast({ isShow: true, type: "error", message: "Description not provided" });
  }

  if (!technicianId) {
    return setShowToast({ isShow: true, type: "error", message: "Technician not selected" });
  }
  if (!repairStatus) {
    return setShowToast({ isShow: true, type: "error", message: "Repair status not selected" });
  }

  const data = {
    deviceId,
    repairType,
    repairDescription,
    technicianId,
    repairNotes: repairNotes || null,
    repairStatus,
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
