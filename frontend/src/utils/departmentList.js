export const departmentsList = [
  {
    faculty: "NAS",
    type: "Academic",
    departments: [
      { id: 0, name: "Mathematics and Statistics", description: "Mathematical theory, applied mathematics, and statistics." },
      { id: 1, name: "Computer Science", description: "Software engineering, programming, and data science." },
      { id: 2, name: "Physics", description: "Matter, energy, and physical sciences." },
      { id: 3, name: "Chemistry", description: "Chemical reactions, materials, and molecular research." },
      { id: 4, name: "Biological Sciences", description: "Life sciences, genetics, and environmental biology." },
      { id: 5, name: "Geography and Environmental Science", description: "Earth systems, GIS, and climate studies." },
    ],
  },
  {
    faculty: "EDU",
    type: "Academic",
    departments: [
      { id: 6, name: "Educational Psychology", description: "Learning behavior and cognitive development." },
      { id: 7, name: "Curriculum Studies", description: "Design and development of educational content." },
      { id: 8, name: "Foundation Phase Education", description: "Teaching at early childhood and primary levels." },
      { id: 9, name: "Education Management and Leadership", description: "School management and educational policy." },
      { id: 10, name: "Inclusive Education", description: "Special needs and learning support." },
    ],
  },
  {
    faculty: "EMS",
    type: "Academic",
    departments: [
      { id: 11, name: "Accounting", description: "Financial reporting, auditing, and taxation." },
      { id: 12, name: "Economics", description: "Microeconomics, macroeconomics, and policy analysis." },
      { id: 13, name: "Business Management", description: "Organisational strategy and operations." },
      { id: 14, name: "Marketing", description: "Consumer behaviour, branding, and communications." },
      { id: 15, name: "Public Administration", description: "Governance, leadership, and service delivery." },
      { id: 16, name: "Finance and Banking", description: "Investment, risk management, and banking." },
    ],
  },
  {
    faculty: "HUM",
    type: "Academic",
    departments: [
      { id: 17, name: "Languages and Communication", description: "Linguistics, literature, and media communication." },
      { id: 18, name: "History and Political Studies", description: "Historical analysis and political systems." },
      { id: 19, name: "Philosophy and Ethics", description: "Logic, ethics, and philosophy." },
      { id: 20, name: "Psychology", description: "Human behaviour, cognition, and emotion." },
      { id: 21, name: "Sociology and Anthropology", description: "Social systems, culture, and human interaction." },
      { id: 22, name: "Fine Arts and Design", description: "Artistic expression, design, and creative studies." },
    ],
  },
  {
    faculty: "Operations",
    type: "Support",
    departments: [
      { id: 23, name: "ICT Services", description: "Manages IT infrastructure, systems, and cybersecurity." },
      { id: 24, name: "Human Resources", description: "Staff recruitment, wellness, and labour relations." },
      { id: 25, name: "Finance", description: "Budgeting, payroll, and financial reporting." },
      { id: 26, name: "Registrar’s Office", description: "Student records, registration, and examinations." },
      { id: 27, name: "Library and Information Services", description: "Academic resources, digital archives, and library systems." },
      { id: 28, name: "Marketing and Communications", description: "Public relations, branding, and media management." },
      { id: 29, name: "Legal and Compliance", description: "Contracts, governance, and institutional compliance." },
      { id: 30, name: "Facilities Management", description: "Campus infrastructure, maintenance, and transport." },
      { id: 31, name: "Student Affairs", description: "Student support, residence life, and counselling." },
      { id: 32, name: "Security and Risk Management", description: "Campus security and risk mitigation." },
      { id: 33, name: "Internal Audit", description: "Internal controls and performance assurance." },
      { id: 34, name: "Research and Innovation Office", description: "Research ethics, grants, and innovation projects." },
      { id: 35, name: "Quality Assurance", description: "Institutional performance and accreditation standards." },
      { id: 36, name: "Procurement and Supply Chain", description: "Purchasing, tenders, and asset management." },
      { id: 37, name: "Health Services", description: "Campus clinic, occupational health, and wellness." },
      { id: 38, name: "Alumni Relations", description: "Engagement with graduates and donors." },
      { id: 39, name: "Sports and Recreation", description: "Athletics, fitness, and student recreation facilities." },
    ],
  },
];

/*
[
  {
    "faculty": "NAS",
    "type": "Academic",
    "departments": [
      { "id": 0, "name": "Mathematics and Statistics", "description": "Mathematical theory, applied mathematics, and statistics." },
      { "id": 1, "name": "Computer Science", "description": "Software engineering, programming, and data science." },
      { "id": 2, "name": "Physics", "description": "Matter, energy, and physical sciences." },
      { "id": 3, "name": "Chemistry", "description": "Chemical reactions, materials, and molecular research." },
      { "id": 4, "name": "Biological Sciences", "description": "Life sciences, genetics, and environmental biology." },
      { "id": 5, "name": "Geography and Environmental Science", "description": "Earth systems, GIS, and climate studies." }
    ]
  },
  {
    "faculty": "EDU",
    "type": "Academic",
    "departments": [
      { "id": 6, "name": "Educational Psychology", "description": "Learning behavior and cognitive development." },
      { "id": 7, "name": "Curriculum Studies", "description": "Design and development of educational content." },
      { "id": 8, "name": "Foundation Phase Education", "description": "Teaching at early childhood and primary levels." },
      { "id": 9, "name": "Education Management and Leadership", "description": "School management and educational policy." },
      { "id": 10, "name": "Inclusive Education", "description": "Special needs and learning support." }
    ]
  },
  {
    "faculty": "EMS",
    "type": "Academic",
    "departments": [
      { "id": 11, "name": "Accounting", "description": "Financial reporting, auditing, and taxation." },
      { "id": 12, "name": "Economics", "description": "Microeconomics, macroeconomics, and policy analysis." },
      { "id": 13, "name": "Business Management", "description": "Organisational strategy and operations." },
      { "id": 14, "name": "Marketing", "description": "Consumer behaviour, branding, and communications." },
      { "id": 15, "name": "Public Administration", "description": "Governance, leadership, and service delivery." },
      { "id": 16, "name": "Finance and Banking", "description": "Investment, risk management, and banking." }
    ]
  },
  {
    "faculty": "HUM",
    "type": "Academic",
    "departments": [
      { "id": 17, "name": "Languages and Communication", "description": "Linguistics, literature, and media communication." },
      { "id": 18, "name": "History and Political Studies", "description": "Historical analysis and political systems." },
      { "id": 19, "name": "Philosophy and Ethics", "description": "Logic, ethics, and philosophy." },
      { "id": 20, "name": "Psychology", "description": "Human behaviour, cognition, and emotion." },
      { "id": 21, "name": "Sociology and Anthropology", "description": "Social systems, culture, and human interaction." },
      { "id": 22, "name": "Fine Arts and Design", "description": "Artistic expression, design, and creative studies." }
    ]
  },
  {
    "faculty": "Operations",
    "type": "Support",
    "departments": [
      { "id": 23, "name": "ICT Services", "description": "Manages IT infrastructure, systems, and cybersecurity." },
      { "id": 24, "name": "Human Resources", "description": "Staff recruitment, wellness, and labour relations." },
      { "id": 25, "name": "Finance", "description": "Budgeting, payroll, and financial reporting." },
      { "id": 26, "name": "Registrar’s Office", "description": "Student records, registration, and examinations." },
      { "id": 27, "name": "Library and Information Services", "description": "Academic resources, digital archives, and library systems." },
      { "id": 28, "name": "Marketing and Communications", "description": "Public relations, branding, and media management." },
      { "id": 29, "name": "Legal and Compliance", "description": "Contracts, governance, and institutional compliance." },
      { "id": 30, "name": "Facilities Management", "description": "Campus infrastructure, maintenance, and transport." },
      { "id": 31, "name": "Student Affairs", "description": "Student support, residence life, and counselling." },
      { "id": 32, "name": "Security and Risk Management", "description": "Campus security and risk mitigation." },
      { "id": 33, "name": "Internal Audit", "description": "Internal controls and performance assurance." },
      { "id": 34, "name": "Research and Innovation Office", "description": "Research ethics, grants, and innovation projects." },
      { "id": 35, "name": "Quality Assurance", "description": "Institutional performance and accreditation standards." },
      { "id": 36, "name": "Procurement and Supply Chain", "description": "Purchasing, tenders, and asset management." },
      { "id": 37, "name": "Health Services", "description": "Campus clinic, occupational health, and wellness." },
      { "id": 38, "name": "Alumni Relations", "description": "Engagement with graduates and donors." },
      { "id": 39, "name": "Sports and Recreation", "description": "Athletics, fitness, and student recreation facilities." }
    ]
  }
]
*/
