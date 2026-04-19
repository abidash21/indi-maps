import indiaTopo from './india-states.json';
import westBengalTopo from './west-bengal.json';
import odishaTopo from './odisha.json';

export const MAP_CONFIGS = {
  'india': {
    name: 'India States',
    topoData: indiaTopo,
    featureKey: 'states',
    propertyKey: 'st_nm',
    regionsList: [
      { id: "Andaman and Nicobar Islands", name: "Andaman and Nicobar Islands" },
      { id: "Andhra Pradesh", name: "Andhra Pradesh" },
      { id: "Arunachal Pradesh", name: "Arunachal Pradesh" },
      { id: "Assam", name: "Assam" },
      { id: "Bihar", name: "Bihar" },
      { id: "Chandigarh", name: "Chandigarh" },
      { id: "Chhattisgarh", name: "Chhattisgarh" },
      { id: "Dadra and Nagar Haveli and Daman and Diu", name: "Dadra and Nagar Haveli and Daman and Diu" },
      { id: "Delhi", name: "Delhi" },
      { id: "Goa", name: "Goa" },
      { id: "Gujarat", name: "Gujarat" },
      { id: "Haryana", name: "Haryana" },
      { id: "Himachal Pradesh", name: "Himachal Pradesh" },
      { id: "Jammu and Kashmir", name: "Jammu and Kashmir" },
      { id: "Jharkhand", name: "Jharkhand" },
      { id: "Karnataka", name: "Karnataka" },
      { id: "Kerala", name: "Kerala" },
      { id: "Ladakh", name: "Ladakh" },
      { id: "Lakshadweep", name: "Lakshadweep" },
      { id: "Madhya Pradesh", name: "Madhya Pradesh" },
      { id: "Maharashtra", name: "Maharashtra" },
      { id: "Manipur", name: "Manipur" },
      { id: "Meghalaya", name: "Meghalaya" },
      { id: "Mizoram", name: "Mizoram" },
      { id: "Nagaland", name: "Nagaland" },
      { id: "Odisha", name: "Odisha" },
      { id: "Puducherry", name: "Puducherry" },
      { id: "Punjab", name: "Punjab" },
      { id: "Rajasthan", name: "Rajasthan" },
      { id: "Sikkim", name: "Sikkim" },
      { id: "Tamil Nadu", name: "Tamil Nadu" },
      { id: "Telangana", name: "Telangana" },
      { id: "Tripura", name: "Tripura" },
      { id: "Uttar Pradesh", name: "Uttar Pradesh" },
      { id: "Uttarakhand", name: "Uttarakhand" },
      { id: "West Bengal", name: "West Bengal" }
    ],
    shortNames: {
      "Dadra and Nagar Haveli and Daman and Diu": "Dadra and Nagar Haveli\n& Daman and Diu",
    },
    labelOffsets: {
      "Dadra and Nagar Haveli\n& Daman and Diu": [-30, 0],
      "Goa": [-25, 5],
      "Kerala": [-25, 5],
      "Lakshadweep": [-35, 0],
      "Puducherry": [45, 10],
      "Sikkim": [0, -15],
      "Tripura": [0, 25],
      "Mizoram": [35, 15],
      "Manipur": [35, 5],
      "Nagaland": [35, 0],
      "Arunachal Pradesh": [0, -15],
      "Andaman and Nicobar Islands": [-35, 0],
      "Chandigarh": [20, -10],
      "Delhi": [20, 0],
      "Punjab": [-15, 10],
      "Himachal Pradesh": [0, -15],
      "Karnataka": [-30, 10],
      "Jharkhand": [-15, 15],
      "Uttarakhand": [10, 0],
      "Andhra Pradesh": [-40, 40],
      "Meghalaya": [0, 10]
    }
  },
  'west-bengal': {
    name: 'West Bengal Districts',
    topoData: westBengalTopo,
    featureKey: 'WestBengal',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Alipurduar","Bankura","Barddhaman","Birbhum","Dakshin Dinajpur","Darjiling","Haora","Hugli","Jalpaiguri","Koch Bihar","Kolkata","Maldah","Murshidabad","Nadia","North Twenty Four Parganas","Paschim Medinipur","Purba Medinipur","Puruliya","South Twenty Four Parganas","Uttar Dinajpur"
    ].map(d => ({ id: d, name: d })),
    shortNames: {},
    labelOffsets: {
      "Kolkata": [20, 0],
    }
  },
  'odisha': {
    name: 'Odisha Districts',
    topoData: odishaTopo,
    featureKey: 'Orissa',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Angul","Baleshwar","Bargarh","Bhadrak","Balangir","Boudh","Cuttack","Debagarh",
      "Dhenkanal","Gajapati","Ganjam","Jagatsinghapur","Jajapur","Jharsuguda",
      "Kalahandi","Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput",
      "Malkangiri","Mayurbhanj","Nabarangapur","Nayagarh","Nuapada","Puri",
      "Rayagada","Sambalpur","Subarnapur","Sundargarh"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Jagatsinghapur": "Jagat-\nsinghapur",
    },
    labelOffsets: {
      "Khordha": [20, 0],
      "Puri": [30, 10],
      "Jagatsinghapur": [35, 0],
      "Kendrapara": [30, 0],
      "Bhadrak": [20, -5],
      "Baleshwar": [20, -10],
      "Jharsuguda": [-5, -10],
      "Debagarh": [0, -10],
    }
  }
};
