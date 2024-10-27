const data = [
  {
    name: "kgosi",
    surname: "Motabogi",
    fullname: "",
    staff_no: 11310,
    phone_number: "0789384743",
    department: "ICT",
    position: "Service Desk Operator",
    contract_type: "Permanent",
    isActive: true,
    laptop: [
      {
        make_model: "HP 455 G10",
        serial_no: "1H84DSD525",
      },
    ],
    date_Joined: new Date().getDate(),
  },
];

export const handleSearch = (searchText) => {
  let searchResults = [];

  if (!searchText) {
    console.log(data);
  }

  for (let i = 0; i < data.length; i++) {
    if (searchText.toLowerCase() === data[i].name.toLowerCase()) {
      searchResults.push(data[i]);
    } else if (searchText.toLowerCase() === data[i].surname.toLowerCase()) {
      searchResults.push(data[i]);
    }
  }

  return console.log(searchResults);
};
