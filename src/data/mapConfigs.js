import indiaTopo from './india-states.json';
import westBengalTopo from './west-bengal.json';
import odishaTopo from './odisha.json';
import assamTopo from './assam.json';
import keralaTopo from './kerala.json';
import tamilnaduTopo from './tamilnadu.json';
import karnatakaTopo from './Karnataka.json';
import telanganaTopo from './Telangana.json';
import maharashtraTopo from './Maharashtra.json';
import jharkhandTopo from './Jharkhand.json';
import biharTopo from './Bihar.json';
import chhattisgarhTopo from './Chhattisgarh.json';
import rajasthanTopo from './Rajasthan.json';
import haryanaTopo from './Haryana.json';
import delhiTopo from './Delhi.json';
import punjabTopo from './Punjab.json';
import uttarakhandTopo from './Uttarakhand.json';
import andhaPradeshTopo from './Andhra_Pradesh.json';
import gujaratTopo from './Gujarat.json';
import madhyaPradeshTopo from './Madhya_Pradesh.json';
import uttarPradeshTopo from './Uttar_Pradesh.json';
import himachalPradeshTopo from './Himachal_Pradesh.json';
import jammuKashmirTopo from './Jammu_and_Kashmir.json';
import arunachalPradeshTopo from './Arunachal_Pradesh.json';
import goaTopo from './Goa.json';
import manipurTopo from './Manipur.json';
import meghalayaTopo from './Meghalaya.json';
import mizoramTopo from './Mizoram.json';
import nagalandTopo from './Nagaland.json';
import sikkimTopo from './Sikkim.json';
import tripuraTopo from './Tripura.json';
import andamanTopo from './Andaman_and_Nicobar_Islands.json';
import chandigarhTopo from './Chandigarh.json';
import dnhddTopo from './Dadra_and_Nagar_Haveli_and_Daman_and_Diu.json';
import lakshadweepTopo from './Lakshadweep.json';
import puducherryTopo from './Puducherry.json';
import ladakhTopo from './Ladakh.json';

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
  },

  'karnataka': {
    name: 'Karnataka Districts',
    topoData: karnatakaTopo,
    featureKey: 'Karnataka',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Bagalkot","Bangalore","Bangalore Rural","Belgaum","Bellary","Bidar","Bijapur",
      "Chamrajnagar","Chikkaballapura","Chikmagalur","Chitradurga","Dakshina Kannada",
      "Davanagere","Dharwad","Gadag","Gulbarga","Hassan","Haveri","Kodagu","Kolar",
      "Koppal","Mandya","Mysore","Raichur","Ramanagara","Shimoga","Tumkur","Udupi",
      "Uttara Kannada","Yadgir"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Bangalore Rural": "Bangalore\nRural",
      "Chamrajnagar": "Chamraj-\nnagar",
      "Chikkaballapura": "Chikka-\nballapura",
      "Dakshina Kannada": "Dakshina\nKannada",
      "Uttara Kannada": "Uttara\nKannada",
    },
    labelOffsets: {
      "Bangalore": [20, 0],
      "Bangalore Rural": [-30, -10],
      "Kodagu": [-10, 10],
      "Udupi": [-25, 0],
      "Dakshina Kannada": [-35, 5],
      "Uttara Kannada": [-35, 0],
      "Ramanagara": [-30, 5],
    }
  },

  'telangana': {
    name: 'Telangana Districts',
    topoData: telanganaTopo,
    featureKey: 'Telangana',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Adilabad","Hanamkonda","Hyderabad","Jagtial","Jaya Shankar","Kamareddy",
      "Karimnagar","Khammam","Komaram Bheem","Kothagudem","Mahabubabad","Mahbubnagar",
      "Malkajgiri","Medak","Nagarkurnool","Nalgonda","Nirmal","Nizamabad","Peddapalle",
      "Rangareddy","Sangareddy","Shamshabad","Siddipet","Suryapet","Wanaparthy",
      "Warangal","Yadadri"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Jaya Shankar": "Jaya\nShankar",
      "Komaram Bheem": "Komaram\nBheem",
      "Nagarkurnool": "Nagar-\nkurnool",
    },
    labelOffsets: {
      "Hyderabad": [20, 0],
      "Rangareddy": [-35, 5],
      "Malkajgiri": [30, -5],
      "Shamshabad": [30, 5],
      "Mahbubnagar": [-35, 0],
    }
  },

  'maharashtra': {
    name: 'Maharashtra Districts',
    topoData: maharashtraTopo,
    featureKey: 'Maharashtra',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Ahmadnagar","Akola","Amravati","Aurangabad","Bhandara","Bid","Buldana",
      "Chandrapur","Dhule","Garhchiroli","Gondiya","Hingoli","Jalgaon","Jalna",
      "Kolhapur","Latur","Mumbai","Mumbai Suburban","Nagpur","Nanded","Nandurbar",
      "Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigarh","Ratnagiri",
      "Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Mumbai Suburban": "Mumbai\nSuburban",
      "Garhchiroli": "Garh-\nchiroli",
    },
    labelOffsets: {
      "Mumbai": [-25, -5],
      "Mumbai Suburban": [-35, -10],
      "Palghar": [-25, 0],
      "Thane": [-20, -5],
      "Raigarh": [-25, 5],
      "Sindhudurg": [-30, 5],
      "Ratnagiri": [-30, 0],
    }
  },

  'jharkhand': {
    name: 'Jharkhand Districts',
    topoData: jharkhandTopo,
    featureKey: 'Jharkhand',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Bokaro","Chatra","Deoghar","Dhanbad","Dumka","Garhwa","Giridih","Godda",
      "Gumla","Hazaribag","Jamtara","Khunti","Kodarma","Latehar","Lohardaga",
      "Pakur","Palamu","Pashchimi Singhbhum","Purba Singhbhum","Ramgarh","Ranchi",
      "Sahibganj","Saraikela-Kharsawan","Simdega"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Pashchimi Singhbhum": "Pashchimi\nSinghbhum",
      "Purba Singhbhum": "Purba\nSinghbhum",
      "Saraikela-Kharsawan": "Saraikela-\nKharsawan",
    },
    labelOffsets: {
      "Ranchi": [-20, 0],
      "Pashchimi Singhbhum": [-35, 5],
      "Purba Singhbhum": [35, 5],
      "Dhanbad": [25, 0],
    }
  },

  'bihar': {
    name: 'Bihar Districts',
    topoData: biharTopo,
    featureKey: 'Bihar',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar",
      "Darbhanga","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur (Bhabua)","Katihar",
      "Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger",
      "Muzaffarpur","Nalanda","Nawada","Pashchim Champaran","Patna","Purba Champaran",
      "Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar",
      "Sitamarhi","Siwan","Supaul","Vaishali"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Kaimur (Bhabua)": "Kaimur",
      "Pashchim Champaran": "Pashchim\nChamparan",
      "Purba Champaran": "Purba\nChamparan",
    },
    labelOffsets: {
      "Patna": [20, 0],
      "Pashchim Champaran": [-35, 0],
      "Purba Champaran": [35, 0],
      "Sheikhpura": [25, 0],
      "Sheohar": [25, -5],
      "Arwal": [20, 5],
    }
  },

  'chhattisgarh': {
    name: 'Chhattisgarh Districts',
    topoData: chhattisgarhTopo,
    featureKey: 'Chhattisgarh',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Balod","Baloda Bazar","Balrampur","Bastar","Bemetra","Bijapur","Bilaspur",
      "Dakshin Bastar Dantewada","Dhamtari","Durg","Gariaband","Janjgir-Champa",
      "Jashpur","Kabeerdham","Kondagaon","Korba","Koriya","Mahasamund","Mungeli",
      "Narayanpur","Raigarh","Raipur","Rajnandgaon","Sukma","Surajpur","Surguja",
      "Uttar Bastar Kanker"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Dakshin Bastar Dantewada": "Dantewada",
      "Uttar Bastar Kanker": "Kanker",
      "Janjgir-Champa": "Janjgir-\nChampa",
      "Baloda Bazar": "Baloda\nBazar",
    },
    labelOffsets: {
      "Raipur": [20, 0],
      "Dakshin Bastar Dantewada": [-35, 5],
      "Uttar Bastar Kanker": [-35, 0],
    }
  },

  'rajasthan': {
    name: 'Rajasthan Districts',
    topoData: rajasthanTopo,
    featureKey: 'Rajasthan',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Ajmer","Alwar","Banswara","Baran","Barmer","Bharatpur","Bhilwara","Bikaner",
      "Bundi","Chittaurgarh","Churu","Dausa","Dhaulpur","Dungarpur","Ganganagar",
      "Hanumangarh","Jaipur","Jaisalmer","Jalor","Jhalawar","Jhunjhunun","Jodhpur",
      "Karauli","Kota","Nagaur","Pali","Pratapgarh","Rajsamand","Sawai Madhopur",
      "Sikar","Sirohi","Tonk","Udaipur"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Chittaurgarh": "Chittaur-\ngarh",
      "Sawai Madhopur": "Sawai\nMadhopur",
      "Hanumangarh": "Hanuman-\ngarh",
    },
    labelOffsets: {
      "Jaipur": [20, 0],
      "Jaisalmer": [0, 10],
      "Ganganagar": [-20, -5],
      "Hanumangarh": [-30, 0],
      "Dhaulpur": [25, 0],
    }
  },

  'haryana': {
    name: 'Haryana Districts',
    topoData: haryanaTopo,
    featureKey: 'Haryana',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Ambala","Bhiwani","Dadri","Faridabad","Fatehabad","Gurgaon","Hisar","Jhajjar",
      "Jind","Kaithal","Karnal","Kurukshetra","Mahendragarh","Mewat","Palwal",
      "Panchkula","Panipat","Rewari","Rohtak","Sirsa","Sonipat","Yamuna Nagar"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Mahendragarh": "Mahendra-\ngarh",
      "Yamuna Nagar": "Yamuna\nNagar",
    },
    labelOffsets: {
      "Faridabad": [25, 0],
      "Gurgaon": [-25, 5],
      "Panchkula": [25, -5],
      "Palwal": [20, 5],
    }
  },

  'delhi': {
    name: 'Delhi Districts',
    topoData: delhiTopo,
    featureKey: 'Delhi',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Central","East","New Delhi","North","North East","North West","Shahdara",
      "South","South East","South West","West"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "North East": "North\nEast",
      "North West": "North\nWest",
      "South East": "South\nEast",
      "South West": "South\nWest",
      "New Delhi": "New\nDelhi",
    },
    labelOffsets: {}
  },

  'punjab': {
    name: 'Punjab Districts',
    topoData: punjabTopo,
    featureKey: 'Punjab',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka",
      "Firozpur","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana",
      "Mansa","Moga","Muktsar","Pathankot","Patiala","Rupnagar",
      "Sahibzada Ajit Singh Nagar","Sangrur","Shahid Bhagat Singh Nagar","Tarn Taran"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Fatehgarh Sahib": "Fatehgarh\nSahib",
      "Sahibzada Ajit Singh Nagar": "SAS Nagar",
      "Shahid Bhagat Singh Nagar": "SBS Nagar",
      "Tarn Taran": "Tarn\nTaran",
    },
    labelOffsets: {
      "Amritsar": [-20, -5],
      "Pathankot": [-20, -5],
      "Rupnagar": [25, 0],
    }
  },

  'uttarakhand': {
    name: 'Uttarakhand Districts',
    topoData: uttarakhandTopo,
    featureKey: 'Uttarakhand',
    propertyKey: 'Dist_Name',
    regionsList: [
      "Almora","Bageshwar","Chamoli","Champawat","Dehradun","Garhwal","Hardwar",
      "Nainital","Pithoragarh","Rudraprayag","Tehri Garhwal","Udham Singh Nagar",
      "Uttarkashi"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Tehri Garhwal": "Tehri\nGarhwal",
      "Udham Singh Nagar": "Udham\nSingh Nagar",
      "Rudraprayag": "Rudra-\nprayag",
    },
    labelOffsets: {
      "Dehradun": [-25, 0],
      "Hardwar": [-20, 5],
      "Udham Singh Nagar": [35, 5],
      "Champawat": [30, 0],
    }
  },

  'andhra-pradesh': {
    name: 'Andhra Pradesh Districts',
    topoData: andhaPradeshTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Anantapur","Chittoor","East Godavari","Guntur","Krishna","Kurnool",
      "Prakasam","S.P.S. Nellore","Srikakulam","Visakhapatnam","Vizianagaram",
      "West Godavari","Y.S.R. Kadapa"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "S.P.S. Nellore": "Nellore",
      "Y.S.R. Kadapa": "Kadapa",
      "East Godavari": "East\nGodavari",
      "West Godavari": "West\nGodavari",
    },
    labelOffsets: {
      "Visakhapatnam": [35, 0],
      "East Godavari": [35, 0],
      "West Godavari": [-35, 0],
      "S.P.S. Nellore": [-30, 0],
      "Y.S.R. Kadapa": [-30, 0],
    }
  },

  'gujarat': {
    name: 'Gujarat Districts',
    topoData: gujaratTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Ahmedabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar",
      "Botad","Chhota Udaipur","Dahod","Dang","Devbhumi Dwarka","Gandhinagar",
      "Gir Somnath","Jamnagar","Junagadh","Kheda","Kutch","Mahisagar","Mehsana",
      "Morbi","Narmada","Navsari","Panchmahal","Patan","Porbandar","Rajkot",
      "Sabarkantha","Surat","Surendranagar","Tapi","Vadodara","Valsad"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Chhota Udaipur": "Chhota\nUdaipur",
      "Devbhumi Dwarka": "Devbhumi\nDwarka",
      "Gir Somnath": "Gir\nSomnath",
      "Sabarkantha": "Sabar-\nkantha",
      "Surendranagar": "Surendra-\nnagar",
    },
    labelOffsets: {
      "Kutch": [0, 10],
      "Ahmedabad": [25, 0],
      "Gandhinagar": [25, -5],
      "Porbandar": [-30, 0],
      "Dang": [20, 5],
    }
  },

  'madhya-pradesh': {
    name: 'Madhya Pradesh Districts',
    topoData: madhyaPradeshTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Agar Malwa","Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul",
      "Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas",
      "Dhar","Dindori","Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur",
      "Jhabua","Katni","Khandwa","Khargone","Mandla","Mandsaur","Morena",
      "Narsinghpur","Neemuch","Niwari","Panna","Raisen","Rajgarh","Ratlam","Rewa",
      "Sagar","Satna","Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri",
      "Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Hoshangabad": "Hoshan-\ngabad",
      "Narsinghpur": "Narsingh-\npur",
      "Agar Malwa": "Agar\nMalwa",
    },
    labelOffsets: {
      "Bhopal": [20, 0],
      "Indore": [-20, 5],
      "Gwalior": [20, -5],
      "Jabalpur": [25, 0],
    }
  },

  'uttar-pradesh': {
    name: 'Uttar Pradesh Districts',
    topoData: uttarPradeshTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Agra","Aligarh","Ambedkar Nagar","Amethi","Amroha","Auraiya","Ayodhya",
      "Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki",
      "Bareilly","Basti","Bhadohi","Bijnor","Budaun","Bulandshahr","Chandauli",
      "Chitrakoot","Deoria","Etah","Etawah","Farrukhabad","Fatehpur","Firozabad",
      "Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur",
      "Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat",
      "Kanpur Nagar","Kasganj","Kaushambi","Kushinagar","Lakhimpur Kheri","Lalitpur",
      "Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur",
      "Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Prayagraj","Rae Bareli",
      "Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli",
      "Shrawasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Ambedkar Nagar": "Ambedkar\nNagar",
      "Gautam Buddha Nagar": "GB Nagar",
      "Kanpur Dehat": "Kanpur\nDehat",
      "Kanpur Nagar": "Kanpur\nNagar",
      "Lakhimpur Kheri": "Lakhimpur\nKheri",
      "Sant Kabir Nagar": "Sant Kabir\nNagar",
      "Siddharthnagar": "Siddharth-\nnagar",
    },
    labelOffsets: {
      "Lucknow": [20, 0],
      "Agra": [20, 5],
      "Ghaziabad": [25, -5],
      "Gautam Buddha Nagar": [35, 5],
      "Hapur": [25, 0],
    }
  },

  'himachal-pradesh': {
    name: 'Himachal Pradesh Districts',
    topoData: himachalPradeshTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul and Spiti",
      "Mandi","Shimla","Sirmaur","Solan","Una"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Lahaul and Spiti": "Lahaul &\nSpiti",
    },
    labelOffsets: {
      "Shimla": [20, 0],
      "Lahaul and Spiti": [0, -10],
      "Kinnaur": [25, 5],
    }
  },

  'jammu-kashmir': {
    name: 'Jammu & Kashmir Districts',
    topoData: jammuKashmirTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Anantnag","Bandipora","Baramulla","Budgam","Doda","Ganderbal","Jammu",
      "Kathua","Kishtwar","Kulgam","Kupwara","Mirpur","Muzaffarabad","Pulwama",
      "Punch","Rajouri","Ramban","Reasi","Samba","Shopiyan","Srinagar","Udhampur"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Muzaffarabad": "Muzaffa-\nrabad",
    },
    labelOffsets: {
      "Srinagar": [25, 0],
      "Jammu": [-20, 5],
      "Baramulla": [-25, 0],
      "Kupwara": [-20, -5],
    }
  },

  'arunachal-pradesh': {
    name: 'Arunachal Pradesh Districts',
    topoData: arunachalPradeshTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Anjaw","Changlang","East Kameng","East Siang","Kamle","Kra Daadi",
      "Lepa Rada","Lohit","Longding","Lower Dibang Valley","Lower Siang",
      "Lower Subansiri","Namsai","Pakke Kessang","Papum Pare","Shi Yomi",
      "Siang","Tirap","Tawang","Tuensang","Upper Dibang Valley","Upper Siang",
      "Upper Subansiri","West Kameng","West Siang"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Upper Dibang Valley": "Upper\nDibang Valley",
      "Lower Dibang Valley": "Lower\nDibang Valley",
      "Upper Subansiri": "Upper\nSubansiri",
      "Lower Subansiri": "Lower\nSubansiri",
      "Pakke Kessang": "Pakke\nKessang",
    },
    labelOffsets: {
      "Tawang": [-20, -5],
      "West Kameng": [-25, 0],
      "Papum Pare": [0, 10],
    }
  },

  'goa': {
    name: 'Goa Districts',
    topoData: goaTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "North Goa","South Goa"
    ].map(d => ({ id: d, name: d })),
    shortNames: {},
    labelOffsets: {}
  },

  'manipur': {
    name: 'Manipur Districts',
    topoData: manipurTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West",
      "Jiribam","Kakching","Kamjong","Kangpokpi","Noney","Pherzawl",
      "Senapati","Tamenglong","Tengnoupal","Thoubal","Ukhrul"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Churachandpur": "Churachand-\npur",
      "Tengnoupal": "Tengnou-\npal",
    },
    labelOffsets: {
      "Imphal West": [-30, 0],
      "Imphal East": [30, 0],
    }
  },

  'meghalaya': {
    name: 'Meghalaya Districts',
    topoData: meghalayaTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "East Garo Hills","East Jaintia Hills","East Khasi Hills","North Garo Hills",
      "Ribhoi","South Garo Hills","South West Garo Hills","South West Khasi Hills",
      "West Garo Hills","West Jaintia Hills","West Khasi Hills"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "East Garo Hills": "East Garo\nHills",
      "East Jaintia Hills": "East Jaintia\nHills",
      "East Khasi Hills": "East Khasi\nHills",
      "North Garo Hills": "North Garo\nHills",
      "South Garo Hills": "South Garo\nHills",
      "South West Garo Hills": "SW Garo\nHills",
      "South West Khasi Hills": "SW Khasi\nHills",
      "West Garo Hills": "West Garo\nHills",
      "West Jaintia Hills": "West Jaintia\nHills",
      "West Khasi Hills": "West Khasi\nHills",
    },
    labelOffsets: {}
  },

  'mizoram': {
    name: 'Mizoram Districts',
    topoData: mizoramTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Aizawl","Champhai","Hnahthial","Khawzawl","Kolasib","Lawngtlai",
      "Lunglei","Mamit","Saiha","Serchhip"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Lawngtlai": "Lawngt-\nlai",
    },
    labelOffsets: {}
  },

  'nagaland': {
    name: 'Nagaland Districts',
    topoData: nagalandTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon",
      "Peren","Phek","Tuensang","Wokha","Zunheboto"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Mokokchung": "Mokok-\nchung",
      "Zunheboto": "Zunhe-\nboto",
    },
    labelOffsets: {}
  },

  'sikkim': {
    name: 'Sikkim Districts',
    topoData: sikkimTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "East Sikkim","North Sikkim","South Sikkim","West Sikkim"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "North Sikkim": "North\nSikkim",
      "South Sikkim": "South\nSikkim",
      "East Sikkim": "East\nSikkim",
      "West Sikkim": "West\nSikkim",
    },
    labelOffsets: {}
  },

  'tripura': {
    name: 'Tripura Districts',
    topoData: tripuraTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Dhalai","Gomati","Khowai","North Tripura","Sipahijala",
      "South Tripura","Unokoti","West Tripura"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "North Tripura": "North\nTripura",
      "South Tripura": "South\nTripura",
      "West Tripura": "West\nTripura",
    },
    labelOffsets: {}
  },

  'andaman-nicobar': {
    name: 'Andaman & Nicobar Islands Districts',
    topoData: andamanTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Nicobars","North and Middle Andaman","South Andaman"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "North and Middle Andaman": "North &\nMiddle Andaman",
    },
    labelOffsets: {}
  },

  'chandigarh': {
    name: 'Chandigarh',
    topoData: chandigarhTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Chandigarh"
    ].map(d => ({ id: d, name: d })),
    shortNames: {},
    labelOffsets: {}
  },

  'dnh-and-dd': {
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    topoData: dnhddTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Dadra and Nagar Haveli","Daman","Diu"
    ].map(d => ({ id: d, name: d })),
    shortNames: {
      "Dadra and Nagar Haveli": "Dadra &\nNagar Haveli",
    },
    labelOffsets: {}
  },

  'lakshadweep': {
    name: 'Lakshadweep',
    topoData: lakshadweepTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Lakshadweep"
    ].map(d => ({ id: d, name: d })),
    shortNames: {},
    labelOffsets: {}
  },

  'puducherry': {
    name: 'Puducherry Districts',
    topoData: puducherryTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Karaikal","Mahe","Puducherry","Yanam"
    ].map(d => ({ id: d, name: d })),
    shortNames: {},
    labelOffsets: {}
  },

  'ladakh': {
    name: 'Ladakh Districts',
    topoData: ladakhTopo,
    featureKey: 'districts',
    propertyKey: 'district',
    regionsList: [
      "Kargil","Leh"
    ].map(d => ({ id: d, name: d })),
    shortNames: {},
    labelOffsets: {}
  }
};
