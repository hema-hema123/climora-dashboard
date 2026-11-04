import type {
  City,
  CityStats,
  GreenInfrastructureRecommendation,
  HeatDataPoint,
  HeatZone,
  InfrastructurePoint,
  SensorLocation,
  TemperatureRecord,
  VegetationArea,
} from '@/types';

// Seeded random number generator for deterministic values
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  let value = Math.abs(hash) / 2147483647;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// Indian cities with their coordinates
const BASE_INDIAN_CITIES: City[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    province: 'Delhi',
    coordinates: [28.6139, 77.209],
    population: 32900000,
    area: 1484,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    province: 'Maharashtra',
    coordinates: [19.076, 72.8777],
    population: 20400000,
    area: 603,
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    province: 'Karnataka',
    coordinates: [12.9716, 77.5946],
    population: 13100000,
    area: 709,
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    province: 'Telangana',
    coordinates: [17.385, 78.4867],
    population: 10400000,
    area: 650,
  },
  {
    id: 'chennai',
    name: 'Chennai',
    province: 'Tamil Nadu',
    coordinates: [13.0827, 80.2707],
    population: 11300000,
    area: 426,
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    province: 'West Bengal',
    coordinates: [22.5726, 88.3639],
    population: 15000000,
    area: 205,
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    province: 'Gujarat',
    coordinates: [23.0225, 72.5714],
    population: 8400000,
    area: 505,
  },
  {
    id: 'pune',
    name: 'Pune',
    province: 'Maharashtra',
    coordinates: [18.5204, 73.8567],
    population: 7200000,
    area: 516,
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    province: 'Rajasthan',
    coordinates: [26.9124, 75.7873],
    population: 4100000,
    area: 467,
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    province: 'Uttar Pradesh',
    coordinates: [26.8467, 80.9462],
    population: 3800000,
    area: 631,
  },
  {
    id: 'surat',
    name: 'Surat',
    province: 'Gujarat',
    coordinates: [21.1702, 72.8311],
    population: 7500000,
    area: 462,
  },
  {
    id: 'kanpur',
    name: 'Kanpur',
    province: 'Uttar Pradesh',
    coordinates: [26.4499, 80.3319],
    population: 3200000,
    area: 403,
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    province: 'Maharashtra',
    coordinates: [21.1458, 79.0882],
    population: 2900000,
    area: 227,
  },
  {
    id: 'indore',
    name: 'Indore',
    province: 'Madhya Pradesh',
    coordinates: [22.7196, 75.8577],
    population: 3200000,
    area: 530,
  },
  {
    id: 'thane',
    name: 'Thane',
    province: 'Maharashtra',
    coordinates: [19.2183, 72.9781],
    population: 2600000,
    area: 147,
  },
  {
    id: 'bhopal',
    name: 'Bhopal',
    province: 'Madhya Pradesh',
    coordinates: [23.2599, 77.4126],
    population: 2400000,
    area: 463,
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    province: 'Andhra Pradesh',
    coordinates: [17.6868, 83.2185],
    population: 2400000,
    area: 682,
  },
  {
    id: 'pimpri_chinchwad',
    name: 'Pimpri-Chinchwad',
    province: 'Maharashtra',
    coordinates: [18.6298, 73.7997],
    population: 2200000,
    area: 181,
  },
  {
    id: 'patna',
    name: 'Patna',
    province: 'Bihar',
    coordinates: [25.5941, 85.1376],
    population: 2500000,
    area: 250,
  },
  {
    id: 'vadodara',
    name: 'Vadodara',
    province: 'Gujarat',
    coordinates: [22.3072, 73.1812],
    population: 2200000,
    area: 400,
  },
  {
    id: 'ghaziabad',
    name: 'Ghaziabad',
    province: 'Uttar Pradesh',
    coordinates: [28.6692, 77.4538],
    population: 2400000,
    area: 210,
  },
  {
    id: 'ludhiana',
    name: 'Ludhiana',
    province: 'Punjab',
    coordinates: [30.901, 75.8573],
    population: 1900000,
    area: 310,
  },
  {
    id: 'agra',
    name: 'Agra',
    province: 'Uttar Pradesh',
    coordinates: [27.1767, 78.0081],
    population: 1800000,
    area: 188,
  },
  {
    id: 'nashik',
    name: 'Nashik',
    province: 'Maharashtra',
    coordinates: [19.9975, 73.7898],
    population: 1600000,
    area: 259,
  },
  {
    id: 'faridabad',
    name: 'Faridabad',
    province: 'Haryana',
    coordinates: [28.4089, 77.3178],
    population: 1800000,
    area: 207,
  },
  {
    id: 'meerut',
    name: 'Meerut',
    province: 'Uttar Pradesh',
    coordinates: [28.9845, 77.7064],
    population: 1500000,
    area: 450,
  },
  {
    id: 'rajkot',
    name: 'Rajkot',
    province: 'Gujarat',
    coordinates: [22.3039, 70.8022],
    population: 1400000,
    area: 170,
  },
  {
    id: 'kalyan_dombivli',
    name: 'Kalyan-Dombivli',
    province: 'Maharashtra',
    coordinates: [19.2403, 73.1305],
    population: 1500000,
    area: 137,
  },
  {
    id: 'vasai_virar',
    name: 'Vasai-Virar',
    province: 'Maharashtra',
    coordinates: [19.3919, 72.8397],
    population: 1400000,
    area: 311,
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    province: 'Uttar Pradesh',
    coordinates: [25.3176, 82.9739],
    population: 1400000,
    area: 113,
  },
  {
    id: 'srinagar',
    name: 'Srinagar',
    province: 'Jammu and Kashmir',
    coordinates: [34.0837, 74.7973],
    population: 1200000,
    area: 294,
  },
  {
    id: 'chhatrapati_sambhajinagar',
    name: 'Chhatrapati Sambhajinagar',
    province: 'Maharashtra',
    coordinates: [19.8762, 75.3433],
    population: 1200000,
    area: 139,
  },
  {
    id: 'dhanbad',
    name: 'Dhanbad',
    province: 'Jharkhand',
    coordinates: [23.7957, 86.4304],
    population: 1200000,
    area: 275,
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    province: 'Punjab',
    coordinates: [31.634, 74.8723],
    population: 1200000,
    area: 267,
  },
  {
    id: 'navi_mumbai',
    name: 'Navi Mumbai',
    province: 'Maharashtra',
    coordinates: [19.033, 73.0297],
    population: 1200000,
    area: 108,
  },
  {
    id: 'prayagraj',
    name: 'Prayagraj',
    province: 'Uttar Pradesh',
    coordinates: [25.4358, 81.8463],
    population: 1200000,
    area: 365,
  },
  {
    id: 'ranchi',
    name: 'Ranchi',
    province: 'Jharkhand',
    coordinates: [23.3441, 85.3096],
    population: 1200000,
    area: 175,
  },
  {
    id: 'howrah',
    name: 'Howrah',
    province: 'West Bengal',
    coordinates: [22.5958, 88.2636],
    population: 1100000,
    area: 63,
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    province: 'Tamil Nadu',
    coordinates: [11.0168, 76.9558],
    population: 1600000,
    area: 257,
  },
  {
    id: 'jabalpur',
    name: 'Jabalpur',
    province: 'Madhya Pradesh',
    coordinates: [23.1815, 79.9864],
    population: 1100000,
    area: 263,
  },
];

// Additional Smart Cities Mission locations. Population and area values here are
// approximate demo values; coordinates are city-center reference points.
type CitySeed = readonly [string, string, string, number, number, number, number];
const SMART_CITY_ADDITIONS: CitySeed[] = [
  ['new_delhi_ndmc', 'New Delhi (NDMC)', 'Delhi', 28.6139, 77.209, 350000, 43],
  ['port_blair', 'Port Blair', 'Andaman and Nicobar Islands', 11.6234, 92.7265, 140000, 41],
  ['amaravati', 'Amaravati', 'Andhra Pradesh', 16.5062, 80.648, 400000, 217],
  ['kakinada', 'Kakinada', 'Andhra Pradesh', 16.9891, 82.2475, 400000, 30],
  ['tirupati', 'Tirupati', 'Andhra Pradesh', 13.6288, 79.4192, 460000, 27],
  ['itanagar', 'Itanagar', 'Arunachal Pradesh', 27.0844, 93.6053, 60000, 36],
  ['pasighat', 'Pasighat', 'Arunachal Pradesh', 28.0669, 95.3267, 25000, 12],
  ['guwahati', 'Guwahati', 'Assam', 26.1445, 91.7362, 1100000, 328],
  ['bhagalpur', 'Bhagalpur', 'Bihar', 25.2425, 86.9842, 410000, 30],
  ['biharsharif', 'Bihar Sharif', 'Bihar', 25.1982, 85.5178, 300000, 30],
  ['muzaffarpur', 'Muzaffarpur', 'Bihar', 26.1209, 85.3647, 400000, 26],
  ['chandigarh', 'Chandigarh', 'Chandigarh', 30.7333, 76.7794, 1100000, 114],
  ['atal_nagar', 'Atal Nagar', 'Chhattisgarh', 21.1619, 81.7891, 100000, 237],
  ['bilaspur_cg', 'Bilaspur', 'Chhattisgarh', 22.0797, 82.1391, 400000, 150],
  ['raipur', 'Raipur', 'Chhattisgarh', 21.2514, 81.6296, 1100000, 226],
  ['silvassa', 'Silvassa', 'Dadra and Nagar Haveli', 20.2763, 73.0083, 150000, 30],
  ['diu', 'Diu', 'Dadra and Nagar Haveli and Daman and Diu', 20.7144, 70.9874, 50000, 40],
  ['panaji', 'Panaji', 'Goa', 15.4909, 73.8278, 120000, 36],
  ['dahod', 'Dahod', 'Gujarat', 22.8379, 74.2531, 150000, 25],
  ['gandhinagar', 'Gandhinagar', 'Gujarat', 23.2156, 72.6369, 300000, 326],
  ['karnal', 'Karnal', 'Haryana', 29.6857, 76.9905, 350000, 90],
  ['dharamshala', 'Dharamshala', 'Himachal Pradesh', 32.219, 76.3234, 55000, 28],
  ['shimla', 'Shimla', 'Himachal Pradesh', 31.1048, 77.1734, 170000, 35],
  ['jammu', 'Jammu', 'Jammu and Kashmir', 32.7266, 74.857, 700000, 240],
  ['davanagere', 'Davanagere', 'Karnataka', 14.4644, 75.9218, 500000, 68],
  ['belagavi', 'Belagavi', 'Karnataka', 15.8497, 74.4977, 600000, 94],
  ['hubballi_dharwad', 'Hubballi-Dharwad', 'Karnataka', 15.3647, 75.124, 1100000, 202],
  ['mangaluru', 'Mangaluru', 'Karnataka', 12.9141, 74.856, 600000, 132],
  ['shivamogga', 'Shivamogga', 'Karnataka', 13.9299, 75.5681, 400000, 70],
  ['tumakuru', 'Tumakuru', 'Karnataka', 13.3392, 77.1017, 400000, 48],
  ['kochi', 'Kochi', 'Kerala', 9.9312, 76.2673, 700000, 95],
  ['thiruvananthapuram', 'Thiruvananthapuram', 'Kerala', 8.5241, 76.9366, 1000000, 215],
  ['kavaratti', 'Kavaratti', 'Lakshadweep', 10.5667, 72.642, 12000, 4],
  ['gwalior', 'Gwalior', 'Madhya Pradesh', 26.2183, 78.1828, 1200000, 289],
  ['sagar', 'Sagar', 'Madhya Pradesh', 23.8388, 78.7378, 300000, 62],
  ['satna', 'Satna', 'Madhya Pradesh', 24.6005, 80.8322, 300000, 73],
  ['ujjain', 'Ujjain', 'Madhya Pradesh', 23.1765, 75.7885, 600000, 152],
  ['solapur', 'Solapur', 'Maharashtra', 17.6599, 75.9064, 1000000, 179],
  ['imphal', 'Imphal', 'Manipur', 24.817, 93.9368, 270000, 35],
  ['shillong', 'Shillong', 'Meghalaya', 25.5788, 91.8933, 400000, 64],
  ['aizawl', 'Aizawl', 'Mizoram', 23.7271, 92.7176, 300000, 129],
  ['kohima', 'Kohima', 'Nagaland', 25.6751, 94.1086, 120000, 20],
  ['bhubaneswar', 'Bhubaneswar', 'Odisha', 20.2961, 85.8245, 900000, 186],
  ['rourkela', 'Rourkela', 'Odisha', 22.2604, 84.8536, 600000, 200],
  ['puducherry', 'Puducherry', 'Puducherry', 11.9416, 79.8083, 660000, 293],
  ['jalandhar', 'Jalandhar', 'Punjab', 31.326, 75.5762, 900000, 115],
  ['ajmer', 'Ajmer', 'Rajasthan', 26.4499, 74.6399, 600000, 55],
  ['kota', 'Kota', 'Rajasthan', 25.2138, 75.8648, 1200000, 221],
  ['udaipur', 'Udaipur', 'Rajasthan', 24.5854, 73.7125, 600000, 64],
  ['gangtok', 'Gangtok', 'Sikkim', 27.3389, 88.6065, 120000, 19],
  ['namchi', 'Namchi', 'Sikkim', 27.1667, 88.3667, 15000, 10],
  ['erode', 'Erode', 'Tamil Nadu', 11.341, 77.7172, 500000, 110],
  ['madurai', 'Madurai', 'Tamil Nadu', 9.9252, 78.1198, 1500000, 148],
  ['salem', 'Salem', 'Tamil Nadu', 11.6643, 78.146, 900000, 124],
  ['thanjavur', 'Thanjavur', 'Tamil Nadu', 10.787, 79.1378, 300000, 36],
  ['thoothukudi', 'Thoothukudi', 'Tamil Nadu', 8.7642, 78.1348, 400000, 90],
  ['tiruchirappalli', 'Tiruchirappalli', 'Tamil Nadu', 10.7905, 78.7047, 1000000, 167],
  ['tirunelveli', 'Tirunelveli', 'Tamil Nadu', 8.7139, 77.7567, 500000, 189],
  ['tiruppur', 'Tiruppur', 'Tamil Nadu', 11.1085, 77.3411, 900000, 160],
  ['vellore', 'Vellore', 'Tamil Nadu', 12.9165, 79.1325, 500000, 87],
  ['greater_warangal', 'Warangal', 'Telangana', 17.9689, 79.5941, 900000, 406],
  ['karimnagar', 'Karimnagar', 'Telangana', 18.4386, 79.1288, 400000, 50],
  ['agartala', 'Agartala', 'Tripura', 23.8315, 91.2868, 600000, 76],
  ['aligarh', 'Aligarh', 'Uttar Pradesh', 27.8974, 78.088, 1000000, 37],
  ['bareilly', 'Bareilly', 'Uttar Pradesh', 28.367, 79.4304, 1000000, 106],
  ['jhansi', 'Jhansi', 'Uttar Pradesh', 25.4484, 78.5685, 600000, 160],
  ['moradabad', 'Moradabad', 'Uttar Pradesh', 28.8386, 78.7733, 900000, 79],
  ['saharanpur', 'Saharanpur', 'Uttar Pradesh', 29.968, 77.5552, 800000, 108],
  ['dehradun', 'Dehradun', 'Uttarakhand', 30.3165, 78.0322, 800000, 300],
  ['new_town_kolkata', 'New Town Kolkata', 'West Bengal', 22.5958, 88.4798, 400000, 28],
];

const existingCityIds = new Set(BASE_INDIAN_CITIES.map((city) => city.id));
export const INDIAN_CITIES: City[] = [
  ...BASE_INDIAN_CITIES,
  ...SMART_CITY_ADDITIONS.filter(([id]) => !existingCityIds.has(id)).map(
    ([id, name, province, latitude, longitude, population, area]) => ({
      id,
      name,
      province,
      coordinates: [latitude, longitude] as [number, number],
      population,
      area,
    }),
  ),
];

const CITY_HEAT_ZONE_NAMES: Record<string, string[]> = {
  delhi: [
    'Chandni Chowk',
    'Connaught Place',
    'Anand Vihar',
    'Dwarka',
    'Okhla Industrial Area',
    'Lajpat Nagar',
  ],
  new_delhi_ndmc: [
    'Connaught Place',
    'Chanakyapuri',
    'Karol Bagh',
    'New Delhi Railway Station',
    'Lodhi Road',
    'Central Secretariat',
  ],
  mumbai: ['Dharavi', 'Bandra Kurla Complex', 'Andheri East', 'Dadar', 'Colaba', 'Lower Parel'],
  bengaluru: ['Majestic', 'Whitefield', 'Electronic City', 'KR Market', 'Hebbal', 'Koramangala'],
  hyderabad: ['Charminar', 'HITEC City', 'Secunderabad', 'Kukatpally', 'Gachibowli', 'Uppal'],
  chennai: ['T. Nagar', 'Guindy', 'Tambaram', 'Perungudi', 'Koyambedu', 'Ambattur'],
  kolkata: [
    'Esplanade',
    'Salt Lake',
    'Howrah Station Area',
    'Park Circus',
    'Garden Reach',
    'New Market',
  ],
  ahmedabad: ['Maninagar', 'Naroda GIDC', 'Kalupur', 'Vastrapur', 'Sabarmati', 'Bopal'],
  pune: ['Shivajinagar', 'Hinjawadi', 'Hadapsar', 'Swargate', 'Pimpri MIDC', 'Kothrud'],
  jaipur: [
    'Walled City',
    'Mansarovar',
    'Sitapura Industrial Area',
    'Vaishali Nagar',
    'Sanganer',
    'Jhotwara',
  ],
  lucknow: ['Hazratganj', 'Aminabad', 'Gomti Nagar', 'Alambagh', 'Charbagh', 'Indira Nagar'],
  surat: [
    'Ring Road Textile Market',
    'Udhna',
    'Varachha',
    'Adajan',
    'Katargam',
    'Hazira Industrial Area',
  ],
  kanpur: [
    'Naveen Market',
    'Swaroop Nagar',
    'Panki Industrial Area',
    'Govind Nagar',
    'Jajmau',
    'Kanpur Central',
  ],
  nagpur: ['Sitabuldi', 'MIHAN', 'Itwari', 'Sadar', 'Hingna MIDC', 'Dharampeth'],
  indore: [
    'Rajwada',
    'Vijay Nagar',
    'Rau',
    'Palasia',
    'Sanwer Road Industrial Area',
    'Chandan Nagar',
  ],
  thane: ['Thane Station Area', 'Wagle Estate', 'Ghodbunder Road', 'Majiwada', 'Kalwa', 'Kolshet'],
  bhopal: ['New Market', 'MP Nagar', 'BHEL Township', 'Old Bhopal', 'Kolar Road', 'Habibganj'],
  visakhapatnam: [
    'Dwaraka Nagar',
    'Gajuwaka',
    'MVP Colony',
    'Rushikonda',
    'Steel Plant Township',
    'Simhachalam',
  ],
  pimpri_chinchwad: [
    'Pimpri Market',
    'Chinchwad Station Area',
    'Bhosari MIDC',
    'Akurdi',
    'Nigdi',
    'Moshi',
  ],
  patna: [
    'Gandhi Maidan',
    'Patna Junction Area',
    'Kankarbagh',
    'Danapur',
    'Gulzarbagh',
    'Boring Road',
  ],
  vadodara: ['Alkapuri', 'Sayajigunj', 'Makarpura GIDC', 'Manjalpur', 'Fatehgunj', 'Karelibaug'],
  ghaziabad: [
    'Vaishali',
    'Indirapuram',
    'Sahibabad Industrial Area',
    'Loni',
    'Raj Nagar',
    'Mohan Nagar',
  ],
  ludhiana: [
    'Chaura Bazaar',
    'Focal Point Industrial Area',
    'Model Town',
    'Gill Road',
    'Ludhiana Junction',
    'Sahnewal',
  ],
  agra: ['Taj Ganj', 'Agra Fort Area', 'Sadar Bazaar', 'Sikandra', 'Trans Yamuna', 'Foundry Nagar'],
  nashik: ['Panchavati', 'Satpur MIDC', 'Ambad MIDC', 'Nashik Road', 'College Road', 'Cidco'],
  faridabad: [
    'NIT Faridabad',
    'Ballabgarh',
    'Sector 15',
    'Bata Chowk',
    'Sector 24 Industrial Area',
    'Greater Faridabad',
  ],
  meerut: [
    'Sadar Bazaar',
    'Shastri Nagar',
    'Pallavpuram',
    'Meerut Cantonment',
    'Partapur Industrial Area',
    'Begum Bridge',
  ],
  rajkot: [
    'Jubilee Garden',
    'Aji Industrial Estate',
    'Gondal Road',
    'Race Course',
    'Bhaktinagar',
    'Rajkot Junction Area',
  ],
  kalyan_dombivli: [
    'Kalyan West',
    'Dombivli East',
    'Dombivli MIDC',
    'Shahad',
    'Kalyan Station Area',
    'Mankoli',
  ],
  vasai_virar: [
    'Vasai Station Area',
    'Nalasopara',
    'Virar East',
    'Manickpur',
    'Naigaon',
    'Waliv Industrial Area',
  ],
  varanasi: [
    'Godowlia',
    'Dashashwamedh Ghat Area',
    'Lanka',
    'Varanasi Cantt',
    'Sarnath',
    'Ramnagar',
  ],
  srinagar: [
    'Lal Chowk',
    'Dal Lake Boulevard',
    'Hazratbal',
    'Nowgam',
    'Bemina',
    'Rangreth Industrial Estate',
  ],
  chhatrapati_sambhajinagar: [
    'CIDCO',
    'Aurangpura',
    'Waluj MIDC',
    'Chikalthana',
    'Railway Station Area',
    'Paithan Gate',
  ],
  dhanbad: ['Bank More', 'Hirapur', 'Jharia', 'Sindri', 'Saraidhela', 'Dhanbad Junction Area'],
  amritsar: [
    'Golden Temple Area',
    'Hall Bazaar',
    'Ranjit Avenue',
    'Amritsar Junction Area',
    'Verka',
    'Chheharta',
  ],
  navi_mumbai: ['Vashi', 'CBD Belapur', 'Nerul', 'Airoli', 'Turbhe MIDC', 'Kharghar'],
  prayagraj: ['Civil Lines', 'Chowk', 'Naini', 'Prayagraj Junction Area', 'Phaphamau', 'Jhunsi'],
  ranchi: ['Main Road', 'Harmu', 'Hatia', 'Doranda', 'Kokar Industrial Area', 'Kanke'],
  howrah: ['Howrah Maidan', 'Shibpur', 'Santragachi', 'Howrah Station Area', 'Liluah', 'Kona'],
  coimbatore: [
    'Gandhipuram',
    'RS Puram',
    'Peelamedu',
    'Singanallur',
    'Ukkadam',
    'Kurichi Industrial Estate',
  ],
  jabalpur: ['Sadar', 'Civil Lines', 'Ranjhi', 'Adhartal', 'Madan Mahal', 'Jabalpur Junction Area'],
};

function getHeatZoneNames(city: City): string[] {
  return (
    CITY_HEAT_ZONE_NAMES[city.id] ?? [
      `${city.name} Central Market`,
      `${city.name} Railway Station Area`,
      `${city.name} Industrial Estate`,
      `${city.name} Civic Centre`,
      `${city.name} Transit Hub`,
      `${city.name} Residential District`,
    ]
  );
}

// Generate mock heat zones for a city
export function generateHeatZones(city: City, date: Date = new Date()): HeatZone[] {
  const random = seededRandom(city.id);
  const zones: HeatZone[] = [];

  // Vary base temperature based on month (summer months are hotter)
  const month = date.getMonth(); // 0-11 (Jan-Dec)
  const seasonalVariation = month >= 5 && month <= 8 ? 5 : month >= 3 && month <= 9 ? 2 : -2; // Summer: +5°C, Spring/Fall: +2°C, Winter: -2°C
  const baseTemp = 36 + random() * 10 + seasonalVariation;

  const zoneNames = getHeatZoneNames(city);

  const severities: Array<'low' | 'moderate' | 'high' | 'extreme'> = [
    'low',
    'moderate',
    'high',
    'extreme',
  ];

  for (let i = 0; i < 6; i++) {
    const offset = 0.02 + random() * 0.03;
    const lat = city.coordinates[0] + (random() - 0.5) * offset * 2;
    const lng = city.coordinates[1] + (random() - 0.5) * offset * 2;
    // Add some variation per zone, but keep seasonal base
    const temp = baseTemp + random() * 10 - 2;

    zones.push({
      id: `zone-${city.id}-${i}`,
      name: zoneNames[i % zoneNames.length],
      severity: severities[Math.min(3, Math.floor((temp - 28) / 4))],
      avgTemperature: temp,
      maxTemperature: temp + 2 + random() * 3,
      area: 0.5 + random() * 2,
      coordinates: generatePolygon(lat, lng, 0.01 + random() * 0.01, random),
      vulnerabilityScore: 30 + random() * 60,
    });
  }

  return zones.sort((a, b) => b.avgTemperature - a.avgTemperature);
}

function generatePolygon(
  centerLat: number,
  centerLng: number,
  radius: number,
  random: () => number,
): [number, number][] {
  const points: [number, number][] = [];
  const numPoints = 6;

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const r = radius * (0.8 + random() * 0.4);
    points.push([centerLat + Math.cos(angle) * r, centerLng + Math.sin(angle) * r * 1.5]);
  }

  return points;
}

// Generate temperature history for a city
export function generateTemperatureHistory(city: City, months: number = 12): TemperatureRecord[] {
  const records: TemperatureRecord[] = [];
  const today = new Date();
  const random = seededRandom(`temperature-${city.id}`);
  const baseline = 29 - Math.max(0, city.coordinates[0] - 15) * 0.12 + random() * 2;
  const seasonalAmplitude = 5 + Math.min(5, Math.abs(city.coordinates[0] - 20) * 0.18);

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);

    // Seasonal variation
    const month = date.getMonth();
    const seasonalFactor = Math.cos(((month - 4) * Math.PI) / 6) * seasonalAmplitude;

    const baseUrban = baseline + seasonalFactor + (random() - 0.5) * 2;
    const baseRural = baseUrban - 2.5 - random() * 2;

    records.push({
      date: date.toISOString().slice(0, 7),
      urban: Math.round(baseUrban * 10) / 10,
      rural: Math.round(baseRural * 10) / 10,
      differential: Math.round((baseUrban - baseRural) * 10) / 10,
    });
  }

  return records;
}

// Generate green infrastructure recommendations
export function generateRecommendations(
  city: City,
  _date: Date = new Date(),
): GreenInfrastructureRecommendation[] {
  const random = seededRandom(city.id);
  const types: GreenInfrastructureRecommendation['type'][] = [
    'urban_park',
    'green_roof',
    'tree_planting',
    'cool_pavement',
    'bioswale',
    'permeable_surface',
    'water_feature',
  ];

  const priorities: Array<'low' | 'medium' | 'high' | 'critical'> = [
    'low',
    'medium',
    'high',
    'critical',
  ];

  const recommendations: GreenInfrastructureRecommendation[] = [];

  const names = [
    'Metro Station Tree Belt',
    'Lake Restoration & Tree Buffer',
    'School Road Tree Plantation',
    'Bus Stop Green Roof',
    'Residential Layout Mini Park',
    'Flyover Vertical Garden',
    'Highway Roadside Tree Belt',
    'Parking Lot Cool Pavement',
    'Temple Ground Community Garden',
    'Market Area Shade Trees',
  ];

  const descriptions = [
    'Strategic placement of native trees and vegetation to create cooling corridors.',
    'Installation of green roof systems on commercial buildings to reduce heat absorption.',
    'Comprehensive tree planting initiative targeting high-heat zones.',
    'Replacement of traditional asphalt with reflective cool pavement materials.',
    'Creation of bioswales for stormwater management and urban cooling.',
    'Installation of permeable surfaces to reduce heat island effect.',
    'Development of water features for evaporative cooling benefits.',
  ];

  for (let i = 0; i < 8; i++) {
    const type = types[Math.floor(random() * types.length)];
    const priority = priorities[Math.floor(random() * priorities.length)];

    recommendations.push({
      id: `rec-${city.id}-${i}`,
      type,
      location: [
        city.coordinates[0] + (random() - 0.5) * 0.06,
        city.coordinates[1] + (random() - 0.5) * 0.08,
      ],
      name: names[i % names.length],
      priority,
      estimatedCost: Math.round((500000 + random() * 4500000) / 10000) * 10000,
      estimatedCoolingEffect: 0.5 + random() * 2.5,
      area: Math.round(1000 + random() * 49000),
      benefitScore: Math.round(40 + random() * 55),
      description: descriptions[Math.floor(random() * descriptions.length)],
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

// Generate city statistics
export function generateCityStats(
  city: City,
  implementedRecommendations: GreenInfrastructureRecommendation[] = [],
): CityStats {
  const random = seededRandom(city.id);
  const baseTemp = 20 + random() * 10;
  const ruralTemp = baseTemp - 4 - random() * 3;

  // Base stats
  const baseHotspotCount = Math.floor(5 + random() * 15);
  const baseGreenCoverage = Math.round((15 + random() * 25) * 10) / 10;
  const baseVulnerablePopulation = Math.round(city.population * (0.08 + random() * 0.12));

  // Calculate impact from implemented recommendations
  // Different types contribute differently to green coverage:
  // - High vegetation types (parks, trees) = 100% contribution
  // - Medium vegetation types (green roofs, bioswales) = 60% contribution
  // - Low vegetation types (cool pavement, permeable) = 20% contribution (infrastructure, not green)
  // - Water features = 40% contribution (water, not vegetation)
  const greenCoverageMultipliers: Record<string, number> = {
    urban_park: 1.0, // 100% - full green coverage
    tree_planting: 1.0, // 100% - full green coverage
    green_roof: 0.6, // 60% - vegetation but on buildings
    bioswale: 0.6, // 60% - vegetation with water management
    water_feature: 0.4, // 40% - water, not vegetation
    cool_pavement: 0.2, // 20% - infrastructure, minimal green
    permeable_surface: 0.2, // 20% - infrastructure, minimal green
  };

  const effectiveGreenArea = implementedRecommendations.reduce((sum, rec) => {
    const multiplier = greenCoverageMultipliers[rec.type] || 0.5; // Default 50% if unknown type
    return sum + (rec.area || 0) * multiplier;
  }, 0);

  const cityAreaKm2 = city?.area || 1; // city.area is in km², default to 1 to avoid division by zero
  const cityAreaM2 = cityAreaKm2 * 1000000; // Convert to m²
  // Calculate additional green coverage percentage
  // Multiply by 10 to make the impact more visible (each recommendation adds ~0.1-0.5% instead of ~0.01-0.05%)
  const additionalGreenCoveragePercent =
    cityAreaM2 > 0 && !Number.isNaN(effectiveGreenArea)
      ? (effectiveGreenArea / cityAreaM2) * 100 * 10
      : 0;

  // Each recommendation reduces hotspots (more green = fewer hotspots)
  // Assume each recommendation can reduce 1-3 hotspots depending on area and type
  // Increased from 0.5-1.5 to make the impact more visible
  const hotspotReduction = implementedRecommendations.reduce((sum, rec) => {
    const reductionFactor = rec.area > 20000 ? 3.0 : rec.area > 10000 ? 2.0 : 1.0;
    return sum + reductionFactor;
  }, 0);

  // Each recommendation reduces vulnerable population by providing cooling and better access
  // Larger projects and higher priority ones have more impact
  // Assume each recommendation can reduce 2-5% of base vulnerable population
  // Increased from 1-3% to make the impact more visible
  const vulnerablePopulationReduction = implementedRecommendations.reduce((sum, rec) => {
    let reductionPercent = 0.02; // Base 2% reduction (increased from 1%)
    if (rec.area > 20000) reductionPercent += 0.02; // Large projects reduce more
    if (rec.priority === 'critical' || rec.priority === 'high') reductionPercent += 0.01; // High priority reduces more
    return sum + reductionPercent;
  }, 0);

  return {
    avgUrbanTemp: Math.round(baseTemp * 10) / 10,
    avgRuralTemp: Math.round(ruralTemp * 10) / 10,
    heatIslandIntensity: Math.round((baseTemp - ruralTemp) * 10) / 10,
    hotspotCount: Math.max(0, Math.floor(baseHotspotCount - hotspotReduction)),
    greenCoverage: Math.min(
      100,
      Math.round((baseGreenCoverage + additionalGreenCoveragePercent) * 10) / 10,
    ),
    vulnerablePopulation: Math.max(
      0,
      Math.round(baseVulnerablePopulation * (1 - vulnerablePopulationReduction)),
    ),
    projectedTempIncrease: Math.round((1.5 + random() * 2) * 10) / 10,
  };
}

// Generate heat data points for the map
export function generateHeatMapData(city: City, resolution: number = 20): HeatDataPoint[] {
  const points: HeatDataPoint[] = [];
  const centerLat = city.coordinates[0];
  const centerLng = city.coordinates[1];
  const spread = 0.08; // Increased spread for better coverage

  const landUses: HeatDataPoint['landUse'][] = [
    'residential',
    'commercial',
    'industrial',
    'park',
    'water',
    'forest',
    'agricultural',
    'bare',
  ];

  // Create a smooth gradient with higher density in center
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      // Normalized position (-1 to 1)
      const normalizedI = (i / resolution - 0.5) * 2;
      const normalizedJ = (j / resolution - 0.5) * 2;

      // Small jitter to break up perfect grid (much smaller)
      const jitterLat = (Math.random() - 0.5) * (spread / resolution) * 0.3;
      const jitterLng = (Math.random() - 0.5) * (spread / resolution) * 0.3;

      const lat = centerLat + normalizedI * spread + jitterLat;
      const lng = centerLng + normalizedJ * spread * 1.2 + jitterLng;

      // Distance from center (0 to ~1.4 for corners)
      const distFromCenter = Math.sqrt(normalizedI ** 2 + normalizedJ ** 2);

      // Create smooth gradient: hot in center, cooler at edges
      // Use exponential decay for more realistic heat island effect
      const gradientFactor = Math.exp(-distFromCenter * 1.2);

      // Base temperature: ~45°C in center, ~28°C at edges (Indian climate)
      const baseTemp = 28 + gradientFactor * 18;

      // Add natural variation (smaller range to maintain gradient)
      const variation = (Math.random() - 0.5) * 3;
      const finalTemp = Math.max(24, Math.min(48, baseTemp + variation));

      // Surface temp is typically higher
      const surfaceTemp = finalTemp + 3 + Math.random() * 4;

      // Vegetation index inversely related to temperature
      const ndvi = Math.max(
        -0.2,
        Math.min(0.8, 0.5 - (finalTemp - 25) * 0.05 + (Math.random() - 0.5) * 0.2),
      );

      points.push({
        lat,
        lng,
        temperature: Math.round(finalTemp * 10) / 10,
        surfaceTemperature: Math.round(surfaceTemp * 10) / 10,
        ndvi: Math.round(ndvi * 100) / 100,
        albedo: 0.15 + Math.random() * 0.3,
        landUse: landUses[Math.floor(Math.random() * landUses.length)],
      });
    }
  }

  return points;
}

// Generate vegetation areas for the map
export function generateVegetationAreas(city: City): VegetationArea[] {
  const random = seededRandom(`${city.id}-vegetation`);
  const areas: VegetationArea[] = [];
  const baseLat = city.coordinates[0];
  const baseLng = city.coordinates[1];

  const types: VegetationArea['type'][] = ['park', 'forest', 'garden', 'greenway'];
  const names = [
    'City Lake Park',
    'Temple Garden',
    'Community Ground',
    'Urban Forest Patch',
    'Lake Restoration Zone',
    'Botanical Garden',
    'Roadside Green Corridor',
    'Neighborhood Park',
  ];

  for (let i = 0; i < 5; i++) {
    const lat = baseLat + (random() - 0.5) * 0.08;
    const lng = baseLng + (random() - 0.5) * 0.08;
    const radius = 0.005 + random() * 0.01;

    areas.push({
      id: `veg-${city.id}-${i}`,
      name: names[i % names.length],
      type: types[Math.floor(random() * types.length)],
      coordinates: generatePolygon(lat, lng, radius, random),
      area: 0.2 + random() * 1.5,
      ndvi: 0.4 + random() * 0.4,
    });
  }

  return areas;
}

// Generate infrastructure points for the map
export function generateInfrastructurePoints(city: City): InfrastructurePoint[] {
  const random = seededRandom(`${city.id}-infrastructure`);
  const points: InfrastructurePoint[] = [];
  const baseLat = city.coordinates[0];
  const baseLng = city.coordinates[1];

  const types: InfrastructurePoint['type'][] = ['building', 'road', 'bridge', 'parking'];
  const names = [
    'BBMP Office',
    'Metro Station',
    'Flyover Junction',
    'Shopping Complex',
    'Tech Park',
    'Bus Depot',
    'Parking Lot',
    'Industrial Area',
  ];

  for (let i = 0; i < 8; i++) {
    const lat = baseLat + (random() - 0.5) * 0.1;
    const lng = baseLng + (random() - 0.5) * 0.1;

    points.push({
      id: `infra-${city.id}-${i}`,
      name: names[i % names.length],
      type: types[Math.floor(random() * types.length)],
      location: [lat, lng],
      size: 0.5 + random() * 1.5,
    });
  }

  return points;
}

// Generate sensor locations for the map
export function generateSensorLocations(city: City): SensorLocation[] {
  const random = seededRandom(`${city.id}-sensors`);
  const sensors: SensorLocation[] = [];
  const baseLat = city.coordinates[0];
  const baseLng = city.coordinates[1];

  const names = [
    'Downtown Sensor',
    'Park Monitoring Station',
    'Residential Area Sensor',
    'Industrial Zone Monitor',
    'Waterfront Station',
    'Transit Hub Sensor',
    'University Campus Monitor',
    'Suburban Station',
  ];

  for (let i = 0; i < 6; i++) {
    const lat = baseLat + (random() - 0.5) * 0.1;
    const lng = baseLng + (random() - 0.5) * 0.1;
    const temp = 20 + random() * 12;
    const lastReading = new Date(Date.now() - random() * 3600000).toISOString();

    sensors.push({
      id: `sensor-${city.id}-${i}`,
      name: names[i % names.length],
      location: [lat, lng],
      temperature: Math.round(temp * 10) / 10,
      lastReading,
    });
  }

  return sensors;
}

// Time series data for charts
export function generateDailyTemperatures(
  days: number = 30,
): { date: string; high: number; low: number; avg: number }[] {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const baseTemp = 25 + Math.sin(i / 5) * 5 + Math.random() * 8;
    const high = baseTemp + 3 + Math.random() * 5;
    const low = baseTemp - 5 - Math.random() * 3;

    data.push({
      date: date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }),
      high: Math.round(high * 10) / 10,
      low: Math.round(low * 10) / 10,
      avg: Math.round(baseTemp * 10) / 10,
    });
  }

  return data;
}
