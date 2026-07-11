export const deviceCategory = [
  {
    id: 1,
    name: "Laptop",
    description: "",
  },
  {
    id: 2,
    name: "Desktop",
    description: "",
  },
  {
    id: 3,
    name: "All In One",
    description: "",
  },
  {
    id: 4,
    name: "Monitor",
    description: "",
  },
  {
    id: 5,
    name: "Tablets",
    description: "",
  },
];

export const deviceManufacture = [
  {
    id: 1,
    name: "HP",
    description: "",
    deviceModel: [
      {
        id: 1,
        name: "255 G8",
        specification: "",
      },
      {
        id: 2,
        name: "255 G9",
        specification: "",
      },
      {
        id: 3,
        name: "455 G8",
        specification: "",
      },
      {
        id: 4,
        name: "455 G9",
        specification: "",
      },
      {
        id: 5,
        name: "455 G10",
        specification: "",
      },
    ],
  },
  {
    id: 2,
    name: "DELL",
    description: "",
    deviceModel: [
      {
        id: 1,
        name: "XPS 3456",
        specification: "",
      },
    ],
  },
  {
    id: 3,
    name: "Lenovo",
    description: "",
    deviceModel: [
      {
        id: 0,
        name: "V15 G5 IRL",
        specification: "",
      },
      {
        id: 1,
        name: "E16",
        specification: "",
      },
      {
        id: 2,
        name: "L14",
        specification: "",
      },
    ],
  },
  {
    id: 4,
    name: "H3C",
    description: "",
    deviceModel: [
      {
        id: 1,
        name: "H3C Laptop",
        specification: "",
      },
    ],
  },
];

////////////////////////////////////////////////////////////////////////////
export const ICT_DEVICES = [
  // ===================== LAPTOPS =====================
  {
    id: 1,
    category: "Laptop",
    type: "Business and Enterprise Laptops",
    manufatures: [
      {
        id: 1,
        name: "HP",
        description: "HP business laptops and enterprise-grade devices.",
        deviceModel: [
          { id: 1, name: "HP 255 G8", specification: "15.6 FHD Ryzen 3/5 entry" },
          { id: 2, name: "HP 255 G9", specification: "Ryzen 5 USB-C business" },
          { id: 3, name: "HP 255 G10", specification: "Ryzen 7000 modern chassis" },
          { id: 5, name: "HP ProBook 455 G6", specification: "15.6 Intel enterprise" },
          { id: 6, name: "HP ProBook 455 G7", specification: "15.6 Intel enterprise" },
          { id: 7, name: "HP ProBook 455 G8", specification: "15.6 Intel enterprise" },
          { id: 8, name: "HP ProBook 455 G9", specification: "15.6 Intel enterprise" },
          { id: 9, name: "HP ProBook 455 G10", specification: "14 Intel 13th Gen business" },
          { id: 10, name: "HP EliteBook 840 G8", specification: "Premium security laptop" },
          { id: 11, name: "HP EliteBook 840 G10", specification: "Ultra-secure enterprise" },
          { id: 12, name: "HP ZBook Firefly 14", specification: "Mobile workstation" },
        ],
      },
      {
        id: 2,
        name: "Lenovo",
        description: "ThinkPad durability and enterprise reliability.",
        deviceModel: [
          { id: 1, name: "ThinkPad E14 Gen 4", specification: "Business Ryzen 5" },
          { id: 2, name: "ThinkPad E16 Gen 2", specification: "16-inch productivity" },
          { id: 9, name: "ThinkPad E16 Gen 3", specification: "16-inch productivity" },
          { id: 3, name: "ThinkPad L14 Gen 4", specification: "Secure business laptop" },
          { id: 4, name: "ThinkPad X1 Carbon Gen 11", specification: "Ultra-light premium" },
          { id: 5, name: "ThinkPad X13 Gen 4", specification: "Portable enterprise laptop" },
          { id: 6, name: "IdeaPad Slim 3", specification: "Consumer budget laptop" },
          { id: 7, name: "IdeaPad 5 Pro", specification: "Mid-range performance" },
          { id: 8, name: "V15 G5 IRL", specification: "Mid-range performance" },
        ],
      },
      {
        id: 3,
        name: "Dell",
        description: "Latitude and Inspiron lineup.",
        deviceModel: [
          { id: 1, name: "Latitude 5530", specification: "Intel i5/i7 enterprise" },
          { id: 2, name: "Latitude 5540", specification: "13th Gen business laptop" },
          { id: 3, name: "Latitude 7440", specification: "Premium ultrabook" },
          { id: 4, name: "Latitude 9440 2-in-1", specification: "Convertible premium laptop" },
          { id: 5, name: "Inspiron 15 3530", specification: "Entry consumer laptop" },
          { id: 6, name: "XPS 13 Plus", specification: "Premium ultrabook design" },
        ],
      },
      {
        id: 4,
        name: "Apple",
        description: "MacBook ecosystem devices.",
        deviceModel: [
          { id: 1, name: "MacBook Air M1", specification: "Entry Apple Silicon" },
          { id: 2, name: "MacBook Air M2", specification: "Lightweight premium" },
          { id: 3, name: "MacBook Air M3", specification: "Latest generation" },
          { id: 4, name: "MacBook Pro 14 M3 Pro", specification: "Creative workflows" },
          { id: 5, name: "MacBook Pro 16 M3 Max", specification: "High-end production" },
        ],
      },
    ],
  },

  // ===================== TABLETS =====================
  {
    id: 2,
    category: "Tablet",
    type: "Mobile Computing Devices",
    manufatures: [
      {
        id: 1,
        name: "Apple",
        description: "iPad lineup for productivity and education.",
        deviceModel: [
          { id: 1, name: "iPad 9th Gen", specification: "10.2 Retina" },
          { id: 2, name: "iPad 10th Gen", specification: "USB-C redesign" },
          { id: 3, name: "iPad Air M1", specification: "Light performance tablet" },
          { id: 4, name: "iPad Air M2", specification: "Enhanced performance" },
          { id: 5, name: "iPad Pro 11 M2", specification: "ProMotion display" },
          { id: 6, name: "iPad Pro 12.9 M2", specification: "Mini LED display" },
          { id: 7, name: "iPad Mini 6", specification: "Compact powerhouse" },
        ],
      },
      {
        id: 2,
        name: "Samsung",
        description: "Galaxy Tab Android ecosystem.",
        deviceModel: [
          { id: 1, name: "Galaxy Tab A8", specification: "Entry Android tablet" },
          { id: 2, name: "Galaxy Tab A9+", specification: "Mid-range tablet" },
          { id: 3, name: "Galaxy Tab S6 Lite", specification: "S Pen support" },
          { id: 4, name: "Galaxy Tab S7 FE", specification: "Large display" },
          { id: 5, name: "Galaxy Tab S8", specification: "High performance" },
          { id: 6, name: "Galaxy Tab S9 Ultra", specification: "Flagship AMOLED" },
        ],
      },
      {
        id: 3,
        name: "Lenovo",
        description: "Budget and productivity tablets.",
        deviceModel: [
          { id: 1, name: "Tab M8", specification: "Compact tablet" },
          { id: 2, name: "Tab M10", specification: "10-inch display" },
          { id: 3, name: "Tab P11", specification: "Mid-range productivity" },
          { id: 4, name: "Tab P12", specification: "Large display tablet" },
        ],
      },
      {
        id: 4,
        name: "Microsoft",
        description: "Windows tablet hybrid devices.",
        deviceModel: [
          { id: 1, name: "Surface Go 3", specification: "Light Windows tablet" },
          { id: 2, name: "Surface Go 4", specification: "Improved performance" },
          { id: 3, name: "Surface Pro 8", specification: "Laptop replacement" },
          { id: 4, name: "Surface Pro 9", specification: "Intel/ARM hybrid" },
        ],
      },
    ],
  },

  // ===================== MONITORS =====================
  {
    id: 3,
    category: "Monitor",
    type: "External Display",
    manufatures: [
      {
        id: 1,
        name: "HP",
        description: "Business and home monitors.",
        deviceModel: [
          { id: 1, name: "HP 24f", specification: "24 FHD IPS" },
          { id: 2, name: "HP E24 G4", specification: "USB-C business monitor" },
          { id: 3, name: "HP E27 G4", specification: "27 IPS ergonomic" },
          { id: 4, name: "HP E27 G5", specification: "27 IPS ergonomic" },
          { id: 5, name: "HP Z27k G3", specification: "4K professional display" },
          { id: 6, name: "HP M24fw", specification: "Home office monitor" },
        ],
      },
      {
        id: 2,
        name: "Dell",
        description: "UltraSharp productivity displays.",
        deviceModel: [
          { id: 1, name: "P2419H", specification: "24 IPS monitor" },
          { id: 2, name: "U2723QE", specification: "4K USB-C" },
          { id: 3, name: "S2721DGF", specification: "Gaming 165Hz" },
          { id: 4, name: "U3223QE", specification: "32 4K professional" },
        ],
      },
      {
        id: 3,
        name: "LG",
        description: "IPS and ultra-wide displays.",
        deviceModel: [
          { id: 1, name: "24MK600M", specification: "24 IPS slim bezel" },
          { id: 2, name: "27UL500", specification: "4K HDR display" },
          { id: 3, name: "29WN600", specification: "UltraWide productivity" },
          { id: 4, name: "32UN880", specification: "Ergo 4K display" },
        ],
      },
    ],
  },

  // ===================== PRINTERS (NEW EXPANDED) =====================
  {
    id: 4,
    category: "Printer",
    type: "Printing Devices",
    manufatures: [
      {
        id: 1,
        name: "HP",
        description: "HP LaserJet and Smart Tank printers.",
        deviceModel: [
          { id: 1, name: "HP LaserJet Pro M404dn", specification: "Monochrome laser printer" },
          { id: 2, name: "HP LaserJet Pro MFP M428fdw", specification: "All-in-one wireless" },
          { id: 3, name: "HP Color LaserJet Pro MFP M479fdw", specification: "Color multifunction printer" },
          { id: 4, name: "HP Smart Tank 515", specification: "Ink tank printer" },
          { id: 5, name: "HP DeskJet 2720", specification: "Home inkjet printer" },
          { id: 6, name: "HP OfficeJet Pro 9010", specification: "Business inkjet printer" },
          { id: 7, name: "HP LaserJet Enterprise M507dn", specification: "Enterprise laser printer" },
        ],
      },
      {
        id: 2,
        name: "Canon",
        description: "Canon inkjet and imageCLASS printers.",
        deviceModel: [
          { id: 1, name: "Canon PIXMA G3411", specification: "Ink tank printer" },
          { id: 2, name: "Canon PIXMA TS3340", specification: "Home inkjet printer" },
          { id: 3, name: "Canon imageCLASS MF445dw", specification: "Laser multifunction" },
          { id: 4, name: "Canon LBP6030w", specification: "Compact laser printer" },
          { id: 5, name: "Canon MAXIFY GX6040", specification: "High volume ink tank" },
        ],
      },
      {
        id: 3,
        name: "Epson",
        description: "EcoTank printing solutions.",
        deviceModel: [
          { id: 1, name: "Epson L3250", specification: "EcoTank ink printer" },
          { id: 2, name: "Epson L5290", specification: "All-in-one ink tank" },
          { id: 3, name: "Epson EcoTank L8050", specification: "Photo printer" },
          { id: 4, name: "Epson WorkForce WF-2830", specification: "Office inkjet" },
        ],
      },
      {
        id: 4,
        name: "Brother",
        description: "Reliable laser printers.",
        deviceModel: [
          { id: 1, name: "Brother HL-L2350DW", specification: "Monochrome laser" },
          { id: 2, name: "Brother DCP-L2540DW", specification: "All-in-one laser" },
          { id: 3, name: "Brother MFC-L2750DW", specification: "Wireless laser MFP" },
        ],
      },
    ],
  },

  // ===================== NETWORKING =====================
  {
    id: 5,
    category: "Networking",
    type: "",
    manufatures: [
      {
        id: 1,
        name: "Cisco",
        description: "Enterprise networking devices.",
        deviceModel: [
          { id: 1, name: "Catalyst 9115AX", specification: "Wi-Fi 6 AP" },
          { id: 2, name: "Catalyst 9200", specification: "Access switch" },
          { id: 3, name: "Catalyst 9300", specification: "Enterprise switch" },
          { id: 4, name: "Catalyst 9500", specification: "Core switch" },
          { id: 5, name: "Nexus 9000", specification: "Data center switch" },
        ],
      },
    ],
  },

  // ===================== TV =====================
  {
    id: 6,
    category: "TV",
    type: "",
    manufatures: [
      {
        id: 1,
        name: "Samsung",
        description: "Smart TVs and UHD displays.",
        deviceModel: [
          { id: 1, name: "Samsung AU7000", specification: "4K Smart TV" },
          { id: 2, name: "Samsung Q60B", specification: "QLED 4K TV" },
          { id: 3, name: "Samsung Q80C", specification: "Premium QLED TV" },
        ],
      },
      {
        id: 2,
        name: "LG",
        description: "OLED and LED TVs.",
        deviceModel: [
          { id: 1, name: "LG UP7750", specification: "4K LED TV" },
          { id: 2, name: "LG OLED C2", specification: "Premium OLED display" },
          { id: 3, name: "LG NanoCell 80", specification: "NanoCell 4K TV" },
        ],
      },
    ],
  },
];

/**
 {
        id: 1,
        name: "HP",
        description: "",
        deviceModel: [
          {
            id: 1,
            name: "255 G8",
            specification: "",
          },
          {
            id: 2,
            name: "255 G9",
            specification: "",
          },
          {
            id: 3,
            name: "455 G8",
            specification: "",
          },
          {
            id: 4,
            name: "455 G9",
            specification: "",
          },
          {
            id: 5,
            name: "455 G10",
            specification: "",
          },
        ],
      },
      {
        id: 1,
        name: "DELL",
        description: "",
        deviceModel: [
          
        ],
      },
 */

/*export const ICT_DEVICES = {
  Laptops: {
    Dell: ["Latitude 5420", "XPS 13"],
    HP: ["EliteBook 840", "ProBook 450"],
    Lenovo: ["ThinkPad T14", "IdeaPad Flex 5"],
  },
  
  Desktops: {
    Dell: ["OptiPlex 7080"],
    Lenovo: ["ThinkCentre M720"],
    HP: ["EliteDesk 800"],
  },
  Monitors: {
    Samsung: ["S24F350", "U28E590D"],
    LG: ["27MK400H", "UltraFine 5K"],
    Dell: ["P2419H"],
  },
  Printers: {
    Canon: ["LBP6230dw"],
    HP: ["LaserJet Pro M404n"],
    Brother: ["HL-L2350DW"],
  },
  Networking: {
    Cisco: ["Catalyst 2960", "Meraki MX64"],
    Ubiquiti: ["UniFi Switch 8"],
    "TP-Link": ["Archer C7"],
  },
};*/
