import indiaTopo from './india-states.json';
import westBengalTopo from './west-bengal.json';
import odishaTopo from './odisha.json';
import assamTopo from './assam.json';
import keralaTopo from './kerala.json';
import tamilnaduTopo from './tamilnadu.json';

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
      "Alipurduar","Bankura","Barddhaman","Birbhum","Dakshin Dinajpur","Darjiling",
      "Haora","Hugli","Jalpaiguri","Koch Bihar","Kolkata","Maldah","Murshidabad",
      "Nadia","North Twenty Four Parganas","Paschim Medinipur","Purba Medinipur",
      "Puruliya","South Twenty Four Parganas","Uttar Dinajpur"
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
  },

  'assam': {
    name: 'Assam Districts',
    topoData: assamTopo,
    featureKey: 'Assam',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Barpeta","Chirang","Cachar","Udalguri","Dhemaji","Dhuburi","Dibrugarh",
      "Goalpara","Golaghat","Hailakandi","Jorhat","Kamrup","Karimganj","Lakhimpur",
      "Morigaon","Nagaon","Dima Hasao","Sivasagar","Sonitpur","Tinsukia",
      "Nalbari","Baksa","Kamrup Metropolitan","Darrang","Bongaigaon","Karbi Anglong","Kokrajhar"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Kamrup Metropolitan": "Kamrup\nMetro",
      "Dima Hasao": "Dima\nHasao",
      "Karbi Anglong": "Karbi\nAnglong",
    },
    labelOffsets: {
      "Kamrup Metropolitan": [30, 0],
      "Bongaigaon": [-10, 10],
      "Chirang": [10, 15],
      "Baksa": [10, 10],
    }
  },

  'kerala': {
    name: 'Kerala Districts',
    topoData: keralaTopo,
    featureKey: 'Kerala',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam",
      "Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta",
      "Thiruvananthapuram","Thrissur","Wayanad"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Thiruvananthapuram": "Thiruvan-\nanthapuram",
      "Pathanamthitta": "Pathanam-\nthitta",
    },
    labelOffsets: {
      "Thiruvananthapuram": [-30, 0],
      "Pathanamthitta": [-35, 0],
      "Alappuzha": [-30, 5],
      "Kasaragod": [-20, -5],
      "Ernakulam": [-25, 0],
    }
  },

  'tamil-nadu': {
    name: 'Tamil Nadu Districts',
    topoData: tamilnaduTopo,
    featureKey: 'TamilNadu',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul",
      "Erode","Kancheepuram","Kanniyakumari","Karur","Krishnagiri","Madurai",
      "Nagapattinam","Namakkal","The Nilgiris","Perambalur","Pudukkottai",
      "Ramanathapuram","Salem","Sivaganga","Thanjavur","Theni","Thiruvallur",
      "Thiruvarur","Thoothukudi","Tiruchchirappalli","Tirunelveli","Tiruppur",
      "Tiruvannamalai","Vellore","Villupuram","Virudhunagar"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Kanniyakumari": "Kanya-\nkumari",
      "Ramanathapuram": "Ramana-\nthapuram",
      "Tiruchchirappalli": "Trichy",
      "The Nilgiris": "Nilgiris",
    },
    labelOffsets: {
      "Chennai": [25, 0],
      "Kanniyakumari": [0, 15],
      "Ramanathapuram": [30, 5],
      "Thoothukudi": [30, 0],
      "Tirunelveli": [-25, 5],
      "Nagapattinam": [30, 5],
      "Thiruvarur": [30, 0],
      "Kancheepuram": [-30, 5],
      "Thiruvallur": [-20, -5],
    }
  }
};
