export const url = (param) => {
  return `${process.env.REACT_APP_BASE_URL}/api/v1${param}`;
};

export const nigerian_states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

// ant designs tables need a key for each table row
export function addKeysToObj(params) {
  let arr = [];
  params && params.map((data, index) => arr.push({ key: index, ...data }));
  return arr;
}

export const toCurrency = (num) => {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
