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
  {
    id: 1,
    category: "Laptop",
    type: "Business and Enterprise Laptops",
    manufatures: [
      {
        id: 1,
        name: "HP",
        description: "HP 255 and 455 series are reliable business laptops offering AMD processors and essential features.",
        deviceModel: [
          {
            id: 1,
            name: "HP 255 G8",
            specification: '15.6" FHD, AMD Ryzen 3/5, basic business use.',
          },
          {
            id: 2,
            name: "HP 255 G9",
            specification: '15.6" FHD, Ryzen 5, USB-C, lightweight.',
          },
          {
            id: 3,
            name: "HP 455 G8",
            specification: '15.6" FHD, Ryzen Pro, enhanced security.',
          },
          {
            id: 4,
            name: "HP 455 G9",
            specification: '15.6" FHD, Ryzen 5/7, USB-C, Wi-Fi 6.',
          },
          {
            id: 5,
            name: "HP 455 G10",
            specification: '15.6" FHD, Ryzen 7000 series, modern design.',
          },
        ],
      },
      {
        id: 2,
        name: "Lenovo",
        description: "Lenovo business laptops offer durability and performance with ThinkPad and V-series lines.",
        deviceModel: [
          {
            id: 0,
            name: "V15 G5 IRL",
            specification: '15.6" FHD, Intel Core i5, value model.',
          },
          {
            id: 1,
            name: "ThinkPad E16",
            specification: '16" FHD, Ryzen 5/7, business-grade.',
          },
          {
            id: 2,
            name: "Lenovo L14",
            specification: '14" FHD, Intel 12th Gen, compact and secure.',
          },
        ],
      },
      {
        id: 3,
        name: "Dell",
        description: "Dell Latitude laptops are known for enterprise durability, performance, and security.",
        deviceModel: [
          {
            id: 1,
            name: "Latitude 5530",
            specification: '15.6" FHD, Intel Core i5/i7, enterprise-grade.',
          },
          {
            id: 2,
            name: "Latitude 5540",
            specification: '15.6" FHD, Intel 13th Gen, Thunderbolt 4.',
          },
          {
            id: 3,
            name: "Latitude 5550",
            specification: '15.6" FHD, latest Intel, long battery life.',
          },
        ],
      },
      {
        id: 4,
        name: "Apple",
        description: "Apple MacBooks are premium laptops with M-series chips, long battery life, and macOS ecosystem integration.",
        deviceModel: [
          {
            id: 1,
            name: "MacBook Air M1",
            specification: '13.3" Retina, Apple M1 chip, fanless design.',
          },
          {
            id: 2,
            name: "MacBook Air M2",
            specification: '13.6" Liquid Retina, M2 chip, ultra-light.',
          },
          {
            id: 3,
            name: "MacBook Air M3",
            specification: '13.6" or 15.3", latest M3 chip, all-day battery.',
          },
          {
            id: 4,
            name: 'MacBook Pro 14" M2 Pro',
            specification: '14.2" Liquid Retina XDR, M2 Pro chip, ProMotion.',
          },
          {
            id: 5,
            name: 'MacBook Pro 16" M2 Max',
            specification: '16.2" XDR display, M2 Max chip, high-end performance.',
          },
          {
            id: 6,
            name: 'MacBook Pro 14" M3 Pro',
            specification: '14.2" XDR, latest chip, advanced workflows.',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    category: "Desktop",
    type: "",
    manufatures: [
      {
        id: 1,
        name: "HP",
        description: "",
        deviceModel: [],
      },
      {
        id: 2,
        name: "Lenovo",
        description: "",
        deviceModel: [],
      },
      {
        id: 3,
        name: "Dell",
        description: "",
        deviceModel: [],
      },
      {
        id: 4,
        name: "Apple",
        description: "",
        deviceModel: [],
      },
    ],
  },
  {
    id: 3,
    category: "Monitor",
    type: "External Display",
    manufatures: [
      {
        id: 1,
        name: "HP",
        description: "HP offers affordable and reliable monitors for business and home use.",
        deviceModel: [
          {
            id: 1,
            name: "HP 24f",
            specification: '24" FHD, ultra-slim, IPS.',
          },
          {
            id: 2,
            name: "HP E24 G4",
            specification: '24" FHD, business monitor with USB-C.',
          },
          {
            id: 3,
            name: "HP P27h G4",
            specification: '27" FHD, HDMI, DisplayPort.',
          },
          {
            id: 4,
            name: "HP Z24n G2",
            specification: '24" QHD, factory color-calibrated.',
          },
        ],
      },
      {
        id: 2,
        name: "Lenovo",
        description: "Lenovo monitors are known for clean design and ThinkVision reliability.",
        deviceModel: [
          {
            id: 1,
            name: "Lenovo ThinkVision T24i",
            specification: '24" FHD, ergonomic stand.',
          },
          {
            id: 2,
            name: "Lenovo ThinkVision P27h",
            specification: '27" QHD, USB-C, professional-grade.',
          },
          {
            id: 3,
            name: "Lenovo L24e-30",
            specification: '24" FHD, slim bezel, budget-friendly.',
          },
          {
            id: 4,
            name: "Lenovo T32h-20",
            specification: '32" QHD, wide display for multitasking.',
          },
        ],
      },
      {
        id: 3,
        name: "Dell",
        description: "Dell monitors are industry-standard for productivity and color accuracy.",
        deviceModel: [
          {
            id: 1,
            name: "Dell P2419H",
            specification: '24" FHD, ultra-thin bezel.',
          },
          {
            id: 2,
            name: "Dell U2723QE",
            specification: '27" 4K, UltraSharp, USB-C.',
          },
          {
            id: 3,
            name: "Dell E2422HS",
            specification: '24" FHD, HDMI, VGA, budget model.',
          },
          {
            id: 4,
            name: "Dell S2721DGF",
            specification: '27" QHD, gaming-grade, 165Hz.',
          },
        ],
      },
      {
        id: 4,
        name: "LG",
        description: "LG monitors include IPS panels and ultra-wide options for various uses.",
        deviceModel: [
          {
            id: 1,
            name: "LG 24MK600M",
            specification: '24" FHD, IPS, slim bezel.',
          },
          {
            id: 2,
            name: "LG 27UL500-W",
            specification: '27" 4K UHD, HDR10, IPS.',
          },
          {
            id: 3,
            name: "LG 29WN600",
            specification: '29" UltraWide FHD, IPS, HDR10.',
          },
          {
            id: 4,
            name: "LG 32UN880-B",
            specification: '32" 4K Ergo Monitor, USB-C.',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    category: "Printer",
    type: "",
    manufatures: [
      {
        id: 1,
        name: "HP",
        description: "",
        deviceModel: [],
      },
      {
        id: 2,
        name: "Minolta",
        description: "",
        deviceModel: [],
      },
    ],
  },
  {
    id: 5,
    category: "Networking",
    type: "",
    manufatures: [
      {
        id: 1,
        name: "Cisco",
        description: "",
        deviceModel: [
          // Access Points (APs)
          {
            id: 1,
            name: "AP - Catalyst 9115AX",
            specification: "Wi-Fi 6, entry-level AP.",
          },
          {
            id: 2,
            name: "AP - Catalyst 9120AX",
            specification: "Wi-Fi 6, mid-range AP.",
          },
          {
            id: 3,
            name: "AP - Catalyst 9130AX",
            specification: "Wi-Fi 6, high-performance AP.",
          },
          {
            id: 4,
            name: "AP - Catalyst 9162I",
            specification: "Wi-Fi 6E, small office AP.",
          },
          {
            id: 5,
            name: "AP - Catalyst 9164I",
            specification: "Wi-Fi 6E, mid-range AP.",
          },
          {
            id: 6,
            name: "AP - Catalyst 9166I",
            specification: "Wi-Fi 6E, high-density AP.",
          },
          {
            id: 7,
            name: "AP - Aironet 2802i",
            specification: "Wi-Fi 5, enterprise-grade AP.",
          },
          {
            id: 8,
            name: "AP - Aironet 3802i",
            specification: "Wi-Fi 5, high-density AP.",
          },

          // Network Switches
          {
            id: 9,
            name: "Switch - Catalyst 2960-X",
            specification: "Layer 2, reliable access switch.",
          },
          {
            id: 10,
            name: "Switch - Catalyst 2960-XR",
            specification: "Layer 2/3, enhanced features.",
          },
          {
            id: 11,
            name: "Switch - Catalyst 9200",
            specification: "Layer 2, stackable PoE switch.",
          },
          {
            id: 12,
            name: "Switch - Catalyst 9200L",
            specification: "Fixed uplinks, access layer switch.",
          },
          {
            id: 13,
            name: "Switch - Catalyst 9300",
            specification: "Layer 3, enterprise core switch.",
          },
          {
            id: 14,
            name: "Switch - Catalyst 9400",
            specification: "Modular, campus core/distribution.",
          },
          {
            id: 15,
            name: "Switch - Catalyst 9500",
            specification: "High-performance, core switch.",
          },
          {
            id: 16,
            name: "Switch - Nexus 3000",
            specification: "Data center switch, low latency.",
          },
          {
            id: 17,
            name: "Switch - Nexus 9000",
            specification: "Data center, high performance.",
          },
        ],
      },
      {
        id: 2,
        name: "HRC",
        description: "",
        deviceModel: [],
      },
      {
        id: 3,
        name: "TP-LINK",
        description: "",
        deviceModel: [],
      },
    ],
  },
  {
    id: 6,
    category: "TV",
    type: "",
    manufatures: [
      {
        id: 1,
        name: "Samsung",
        description: "",
        deviceModel: [],
      },
      {
        id: 2,
        name: "LG",
        description: "",
        deviceModel: [],
      },
      {
        id: 3,
        name: "Sony",
        description: "",
        deviceModel: [],
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
