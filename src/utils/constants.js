import moment from 'moment'
import { getBrowserLocale } from './funcs'

export const DATE_FORMAT_ISO = 'YYYY-MM-DD'
export const INITIAL_FILTERS = {
  name: false,
}
/**
 * {country:default_language}
 */
export const COUNTRY_LANG_MAPPING = {
  "de": "de",
  "at": "de",
  "es": "es",
  "ch": "de"
}

export const USER_TYPE = [
  {
    value: 'manager',
    label: 'Manager',
  }, {
    value: 'farmer',
    label: 'Farmer'
  }
]

export const CORPORATIONS = [
  {
    value: 'corp-1',
    label: 'Corporation1',
  }, {
    value: 'corp-2',
    label: 'Corporation2'
  }
]

export const HOLDINGS = [
  {
    value: 'papa-holding',
    label: 'Papa Holding'
  },
  {
    value: 'pixo-holding',
    label: 'Pixo Holding'
  },
  {
    value: 'pink-lady-holding',
    label: 'Pink Lady Holding'
  },
  {
    value: 'green-leady-corporation',
    label: 'Green Leafy Corporation'
  },
]
export const DETAILS = {
  cTitle: 'Pink Lady Corporation',
  farms: {
    label: 'Farms',
    value: '5',
  },
  orchads: {
    label: 'Total Orchads',
    value: '70'
  },
  hectares: {
    label: 'Hectares',
    value: '500'
  },
  predictedDiameter: {
    label: 'Predicted diameter',
    value: '34,42 mm'
  },
  forecastProduction: {
    label: 'Forecast production',
    value: '156 Tons'
  },
  fruitTypes: {
    label: 'Fruit Types',
    value: '2'
  },
  users: {
    label: 'Users',
    value: '23'
  },
  fruitVarieties: {
    label: 'Fruit Varieties',
    value: '24'
  },
  area: {
    label: 'Hectares',
    value: '10.500'
  },
  productionDetails: {
    BiggestFruitDiameter: "Orchard Demo (85mm)",
    HighestDailyGrowthRate: "Orchard Gardern farm (2mm)",
    MostRecentlyMeasured: "Orchard Eden (24 May)",
    SmallestFruitDiameter: "Orchard Demo 3 (55mm)",
    LowestDailyGrowthRate: "Orchard Demo (1mm)",
    LeastRecentlyMeasured: "Orchard Demo (22 May)"
  }
}
export const HOLDINGS_LIST = [
  {
    name: 'Pink Lady',
    country: 'Germany',
    fruitType: 'apples',
    orchadsSize: '20.000',
    users: '30',
    orchads: '100',
    status: 'active',
    corporations: '0'
  },
  {
    name: 'Black Star',
    country: 'Germany',
    fruitType: 'peaches',
    orchadsSize: '20.000',
    users: '30',
    orchads: '100',
    status: 'active',
    corporations: '2'
  },
  {
    name: 'Oranges, Oranges, Oranges',
    country: 'Germany',
    fruitType: 'oranges',
    orchadsSize: '220.000',
    users: '301',
    orchads: '1001',
    status: 'inactive',
    corporations: '200'
  },
  {
    name: 'Green Garden',
    country: 'Germany',
    fruitType: 'apples, oranges',
    orchadsSize: '20.000',
    users: '30',
    orchads: '100',
    status: 'active',
    corporations: '21'
  },
  {
    name: 'Heaven Corp',
    country: 'Germany',
    fruitType: 'apples, peaches',
    orchadsSize: '20.000',
    users: '30',
    orchads: '100',
    status: 'active',
    corporations: '20'
  },
  {
    name: 'King Apples',
    country: 'Germany',
    fruitType: 'peaches',
    orchadsSize: '20.000',
    users: '30',
    orchads: '100',
    status: 'active',
    corporations: '234'
  }
]

export const CORPORATES = [
  {
    name: 'Pink Lady',
    country: 'Germany',
    fruitType: 'apples, oranges, peaches',
    orchadsSize: '20.000',
    users: '30',
    orchads: '100',
    status: 'active'
  },
  {
    name: 'Black Star',
    country: 'Germany',
    fruitType: 'apples, oranges, peaches',
    orchadsSize: '20.000',
    users: '30',
    orchads: '100',
    status: 'active'
  },
  {
    name: 'Oranges, Oranges, Oranges',
    country: 'Germany',
    fruitType: 'oranges',
    orchadsSize: '220.000',
    users: '301',
    orchads: '1001',
    status: 'inactive'
  },
  {
    name: 'Green Garden',
    country: 'Germany',
    fruitType: 'apples, oranges, peaches',
    orchadsSize: '20.000',
    users: '30',
    orchads: '100',
    status: 'active'
  },
  {
    name: 'Heaven Corp',
    country: 'Germany',
    fruitType: 'apples, oranges, peaches',
    orchadsSize: '20.000',
    users: '30',
    orchads: '100',
    status: 'active'
  },
  {
    name: 'King Apples',
    country: 'Germany',
    fruitType: 'apples, oranges, peaches',
    orchadsSize: '20.000',
    users: '30',
    orchads: '100',
    status: 'active'
  }
]

export const FARMS = [
  {
    name: 'One',
    id: 10,
    children: [
      {
        id: 1,
        name: 'Farm One',
        email: 'farmone@pixofarm.com',
        phone: '+1000 000 000',
        last_login_date: '2020-06-02 13:00:00',
        orchards: '1'
      },
      {
        id: 11,
        name: 'Farm Two',
        email: 'farmtwo@pixofarm.com',
        phone: '+2000 000 000',
        last_login_date: '2020-06-02 14:00:00',
        orchards: '2'
      },
      {
        id: 111,
        name: 'Farm Three',
        email: 'farmthree@pixofarm.com',
        phone: '+3000 000 000',
        last_login_date: '2020-06-02 15:00:00',
        orchards: '3'
      },
      {
        id: 1111,
        name: 'Farm Four',
        email: 'farmfour@pixofarm.com',
        phone: '+4000 000 000',
        last_login_date: '2020-06-02 16:00:00',
        orchards: '4'
      }
    ]
  },
  {
    name: 'Two',
    id: 20,
    children: [
      {
        id: 111111,
        name: 'Farm One',
        email: 'farmone@pixofarm.com',
        phone: '+1000 000 000',
        last_login_date: '2020-06-02 13:00:00',
        orchards: '1'
      },
      {
        id: 1111111,
        name: 'Farm Two',
        email: 'farmtwo@pixofarm.com',
        phone: '+2000 000 000',
        last_login_date: '2020-06-02 14:00:00',
        orchards: '2'
      }
    ]
  },
  {
    name: 'Three',
    id: 30,
    email: 'farmone@pixofarm.com',
    phone: '+1000 000 000',
    last_login_date: '2020-06-02 13:00:00',
    orchards: '1'
  }
]

export const FRUIT_TYPES = [
  {
    value: 'golden',
    label: 'Golden'
  },
  {
    value: 'red-delicious',
    label: 'Red delicious'
  },
  {
    value: 'granny-smith',
    label: 'Granny Smith'
  }
]

export const FRUIT_VARIETIES = [
  {
    value: 'golden',
    label: 'Golden'
  },
  {
    value: 'red-delicious',
    label: 'Red delicious'
  },
  {
    value: 'granny-smith',
    label: 'Granny Smith'
  }
]

export const COUNTRIES = [
  {
    value: 'de',
    label: 'Germany'
  },
  {
    value: 'au',
    label: 'Austria'
  },
  {
    value: 'uk',
    label: 'United Kingdom'
  }
]

export const USERS = [
  {
    value: '1',
    label: 'Ovidiu Rugina'
  },
  {
    value: '2',
    label: 'Razvan Nechifor'
  },
  {
    value: '3',
    label: 'Christopher Bartl'
  }
]
export const ORCHAD = [
  {
    farm: 'Eden Garden Farm',
    farmer: 'John Smith',
    status: 'active',
    fruitVariety: 'Apple Golden',
    location: 'rainbow',
    orchadSize: '2 Ha',
    treesAge: '---',
    treesTotal: '3448',
    lastProd: '58 T',

    fistBloom: '16 mar. 2020',
    anticipatedDate: '28 Aug. 2020',
    anticipatedProd: '200 Tons',

    averageDiameter: '94,45 mm',
    predictedDiameter: '99,74mm',
    growthRate: '1,39 mm',
    forecastProduction: '125 Tons'
  }
]
export const ORCHARD_AS_IN_DB = {
  orchardName: 'Ovidiu Orchard 1', //String(max=20)
  orchardSize: 20, //integer
  calculatedSize: 20, //integer (which is calculated by google API)
  location: '', //str (by google API)
  numberOfTrees: 100, //integer
  ageOfTrees: 200, //integer
  fruit: 1, //integer(id)
  lastHarvest: 0, //integer
  averageFruits: 20, //integer
  bloomDate: '2020-05-01', //date
  harvestDate: '2020-07-01', //date
  gpsLatitude: '58.2835470643059,58.28384035974181,58.283377854295466', //string (separated by comma like: 2.0156840,84.15701,31.180847,42.1740745)
  gpsLongitude: '12.287593938484193,12.288559533729554,12.288462974205018', //string (separated by comma like: 2.0156840,84.15701,31.180847,42.1740745)
  user: 271,//271 //integer (farmer id) 
  farm: null, //integer (farm id) *optional
  sizeClasses: [
    {
      "from": 60,
      "to": 75,
      "name": "Jam Fruits",
    },
    {
      "from": 12,
      "to": 112,
      "name": "eweee",
    }
  ],
}

export const DEFAULT_SIZE_CLASS_CUSTOM_LABEL = {
  key: 0,
  name: 'Jam Fruits',
  from: 60,
  to: 75,
  canBeDeleted: true
}

export const MIN_LISTING_TEXT_SEARCH_LNGTH = 3

export const fruitVarieties_data = {
  "Apple": {
    "Ambrosia": 11,
    "Braeburn": 12,
    "Brookfield": 13,
    "Choupette": 14,
    "Crimson Snow": 15,
    "Cripps Pink": 16,
    "Envy": 17,
    "Fendeca": 18,
    "Florina": 19,
    "Fuji": 20,
    "Fujion": 21,
    "Gala": 22,
    "Gala Annaglo": 23,
    "Gala Buckeye": 24,
    "Gala SchniCo": 25,
    "Gala Schniga": 26,
    "Gala Schnitzer": 27,
    "Galaval": 28,
    "Galaxy": 29,
    "Imperatore": 32,
    "Isaaq": 33,
    "Jazz": 34,
    "Jeromine": 35,
    "Kanzi": 36,
    "Kiku": 37,
    "Mondial": 39,
    "Morgenduft": 40,
    "Pacific Rose": 41,
    "Pinova": 42,
    "Renetta": 47,
    "Rockit": 48,
    "Rosy Glow": 49,
    "Royal Gala": 50,
    "Shinano Gold": 51,
    "Red delicious": 2,
    "Granny Smith": 3,
    "Golden": 1,
    "Modi": 38
  },
  "Peach": {
    "Peach1": 52,
    "Peach2": 53,
    "Peach3": 54,
    "Peach5": 55,
  },
  "Brocoli": {
    "Brocoli1": 56,
    "Brocoli2": 57,
    "Brocoli3": 58,
    "Brocoli4": 59,
  },
}

export const groupsFarms_data = [
  {
    "id": 1,
    "name": "GP1",
    "ownerID": 318,
    "farms": [
      {
        "id": 4,
        "farmName": "Ovidiu Rugina Farm",
        "numberOfOrchards": 0,
        "orchards": null
      },
      {
        "id": 5,
        "farmName": "Ovidiu Rugina Farm",
        "numberOfOrchards": 0,
        "orchards": null
      },
      {
        "id": 7,
        "farmName": "Ovidiu Rugina Farmtest",
        "numberOfOrchards": 0,
        "orchards": null
      },
      {
        "id": 8,
        "farmName": "Ovidiu Rugina Farm",
        "numberOfOrchards": 0,
        "orchards": null
      },
      {
        "id": 9,
        "farmName": "Ovidiu Rugina Farm",
        "numberOfOrchards": 0,
        "orchards": null
      }
    ]
  },
  {
    "id": 2,
    "name": "GP2",
    "ownerID": 318,
    "farms": [
      {
        "id": 1,
        "farmName": "Farm1",
        "numberOfOrchards": 3,
        "orchards": [
          {
            "fID": 230,
            "orchardName": "12yshdh",
            "farmer": "fuj",
            "gpsLatitude": "35.778074951982845,35.77264635560245,35.77796778179682",
            "gpsLongitude": "51.42582446336747,51.418890953063965,51.41875918954611",
            "numberOfTrees": 2673,
            "ageOfTrees": 36,
            "calculatedSize": 188660,
            "counter": 3104,
            "isActive": false,
            "visible": false,
            "location": "Tehran",
            "adminSeen": true,
            "fruit": {
              "type": "Apple",
              "variety": "Royal Gala"
            },
            "lastBatch": {
              "forecastProduction": 234.95,
              "lastMeasurements": "2020-03-28",
              "changes": 0,
              "averageDiameter": 55.57319079617183,
              "growthRate": -0.31,
              "predictedDiameter": 2345.77,
              "predictedFruitsSizes": null,
              "predictedFruitsWeights": null
            },
            "lastHarvest": 36,
            "bloomDate": "2019-10-09",
            "harvestDate": "2019-12-09",
            "averageFruits": null,
            "user": 153,
            "farm": 1,
            "sizeClasses": null,
            "roundsOfMeasurements": 0
          },
          {
            "fID": 1230,
            "orchardName": "11yshdh",
            "farmer": "fuj",
            "gpsLatitude": "35.778074951982845,35.77264635560245,35.77796778179682",
            "gpsLongitude": "51.42582446336747,51.418890953063965,51.41875918954611",
            "numberOfTrees": 2673,
            "ageOfTrees": 36,
            "calculatedSize": 188660,
            "counter": 3104,
            "isActive": false,
            "visible": false,
            "location": "Tehran",
            "adminSeen": true,
            "fruit": {
              "type": "Apple",
              "variety": "Royal Gala"
            },
            "lastBatch": {
              "forecastProduction": 234.95,
              "lastMeasurements": "2020-08-27",
              "changes": 0,
              "averageDiameter": 55.57319079617183,
              "growthRate": 22.31,
              "predictedDiameter": 2345.77,
              "predictedFruitsSizes": null,
              "predictedFruitsWeights": null
            },
            "lastHarvest": 36,
            "bloomDate": "2019-10-09",
            "harvestDate": "2019-12-09",
            "averageFruits": null,
            "user": 153,
            "farm": 1,
            "sizeClasses": null,
            "roundsOfMeasurements": 0
          },
          {
            "fID": 228,
            "orchardName": "amir",
            "farmer": "fuj",
            "gpsLatitude": "35.77770420780601,35.77848867106657,35.77785761939919,35.77717460912707,35.777348694341406",
            "gpsLongitude": "51.4272591099143,51.42759338021278,51.427968218922615,51.42775867134332,51.42739757895469",
            "numberOfTrees": 500,
            "ageOfTrees": 5,
            "calculatedSize": 5324,
            "counter": 160,
            "isActive": true,
            "visible": false,
            "location": "Tehran",
            "adminSeen": true,
            "fruit": {
              "type": "Apple",
              "variety": "Royal Gala"
            },
            "lastBatch": {
              "forecastProduction": 15.95,
              "lastMeasurements": "2020-01-26",
              "changes": 0,
              "averageDiameter": 1.57319079617183,
              "growthRate": 3.31,
              "predictedDiameter": 3.77,
              "predictedFruitsSizes": null,
              "predictedFruitsWeights": null
            },
            "lastHarvest": 30,
            "bloomDate": "2019-09-09",
            "harvestDate": "2019-12-09",
            "averageFruits": null,
            "user": 153,
            "farm": 1,
            "sizeClasses": null,
            "roundsOfMeasurements": 0
          },
          {
            "fID": 266,
            "orchardName": "saeed",
            "farmer": "Saeed Hashemi",
            "gpsLatitude": "35.776136346113,35.775978034973086,35.77521694024731,35.775269439152446",
            "gpsLongitude": "51.421907767653465,51.4230527356267,51.422934383153915,51.421680115163326",
            "numberOfTrees": 200,
            "ageOfTrees": 2,
            "calculatedSize": 9979,
            "counter": 3,
            "isActive": true,
            "visible": false,
            "location": "Tehran",
            "adminSeen": true,
            "fruit": {
              "type": "Apple",
              "variety": "Morgenduft"
            },
            "lastBatch": {
              "forecastProduction": 5.95,
              "lastMeasurements": "2019-01-27",
              "changes": 0,
              "averageDiameter": 71.57319079617183,
              "growthRate": -0.31,
              "predictedDiameter": 69.77,
              "predictedFruitsSizes": null,
              "predictedFruitsWeights": null
            },
            "lastHarvest": 200,
            "bloomDate": "2019-01-01",
            "harvestDate": "2020-02-01",
            "averageFruits": 200,
            "user": 231,
            "farm": 1,
            "sizeClasses": null,
            "roundsOfMeasurements": 2
          },
          {
            "fID": 366,
            "orchardName": "saeed",
            "farmer": "Saeed Hashemi",
            "gpsLatitude": "35.776136346113,35.775978034973086,35.77521694024731,35.775269439152446",
            "gpsLongitude": "51.421907767653465,51.4230527356267,51.422934383153915,51.421680115163326",
            "numberOfTrees": 200,
            "ageOfTrees": 2,
            "calculatedSize": 9979,
            "counter": 3,
            "isActive": true,
            "visible": false,
            "location": "Tehran",
            "adminSeen": true,
            "fruit": {
              "type": "Peach",
              "variety": "Peach1"
            },
            "lastBatch": {
              "forecastProduction": 5.95,
              "lastMeasurements": "2020-01-27",
              "changes": 0,
              "averageDiameter": 71.57319079617183,
              "growthRate": -0.31,
              "predictedDiameter": 69.77,
              "predictedFruitsSizes": null,
              "predictedFruitsWeights": null
            },
            "lastHarvest": 200,
            "bloomDate": "2019-01-01",
            "harvestDate": "2020-02-01",
            "averageFruits": 200,
            "user": 231,
            "farm": 1,
            "sizeClasses": null,
            "roundsOfMeasurements": 2
          },
          {
            "fID": 367,
            "orchardName": "saeed",
            "farmer": "Saeed Hashemi",
            "gpsLatitude": "35.776136346113,35.775978034973086,35.77521694024731,35.775269439152446",
            "gpsLongitude": "51.421907767653465,51.4230527356267,51.422934383153915,51.421680115163326",
            "numberOfTrees": 200,
            "ageOfTrees": 2,
            "calculatedSize": 9979,
            "counter": 3,
            "isActive": true,
            "visible": false,
            "location": "Tehran",
            "adminSeen": true,
            "fruit": {
              "type": "Peach",
              "variety": "Peach2"
            },
            "lastBatch": {
              "forecastProduction": 5.95,
              "lastMeasurements": "2020-01-27",
              "changes": 0,
              "averageDiameter": 71.57319079617183,
              "growthRate": -0.31,
              "predictedDiameter": 69.77,
              "predictedFruitsSizes": null,
              "predictedFruitsWeights": null
            },
            "lastHarvest": 200,
            "bloomDate": "2019-01-01",
            "harvestDate": "2020-02-01",
            "averageFruits": 200,
            "user": 231,
            "farm": 1,
            "sizeClasses": null,
            "roundsOfMeasurements": 2
          },
          {
            "fID": 368,
            "orchardName": "saeed",
            "farmer": "Saeed Hashemi",
            "gpsLatitude": "35.776136346113,35.775978034973086,35.77521694024731,35.775269439152446",
            "gpsLongitude": "51.421907767653465,51.4230527356267,51.422934383153915,51.421680115163326",
            "numberOfTrees": 200,
            "ageOfTrees": 2,
            "calculatedSize": 9979,
            "counter": 3,
            "isActive": true,
            "visible": false,
            "location": "Tehran",
            "adminSeen": true,
            "fruit": {
              "type": "Peach",
              "variety": "Peach3"
            },
            "lastBatch": {
              "forecastProduction": 5.95,
              "lastMeasurements": "2020-01-27",
              "changes": 0,
              "averageDiameter": 71.57319079617183,
              "growthRate": -0.31,
              "predictedDiameter": 69.77,
              "predictedFruitsSizes": null,
              "predictedFruitsWeights": null
            },
            "lastHarvest": 200,
            "bloomDate": "2019-01-01",
            "harvestDate": "2020-02-01",
            "averageFruits": 200,
            "user": 231,
            "farm": 1,
            "sizeClasses": null,
            "roundsOfMeasurements": 2
          },
          {
            "fID": 369,
            "orchardName": "saeed",
            "farmer": "Saeed Hashemi",
            "gpsLatitude": "35.776136346113,35.775978034973086,35.77521694024731,35.775269439152446",
            "gpsLongitude": "51.421907767653465,51.4230527356267,51.422934383153915,51.421680115163326",
            "numberOfTrees": 200,
            "ageOfTrees": 2,
            "calculatedSize": 9979,
            "counter": 3,
            "isActive": true,
            "visible": false,
            "location": "Tehran",
            "adminSeen": true,
            "fruit": {
              "type": "Brocoli",
              "variety": "Brocoli1"
            },
            "lastBatch": {
              "forecastProduction": 5.95,
              "lastMeasurements": "2020-01-27",
              "changes": 0,
              "averageDiameter": 71.57319079617183,
              "growthRate": -0.31,
              "predictedDiameter": 69.77,
              "predictedFruitsSizes": null,
              "predictedFruitsWeights": null
            },
            "lastHarvest": 200,
            "bloomDate": "2019-01-01",
            "harvestDate": "2020-02-01",
            "averageFruits": 200,
            "user": 231,
            "farm": 1,
            "sizeClasses": null,
            "roundsOfMeasurements": 2
          },
          {
            "fID": 370,
            "orchardName": "saeed",
            "farmer": "Saeed Hashemi",
            "gpsLatitude": "35.776136346113,35.775978034973086,35.77521694024731,35.775269439152446",
            "gpsLongitude": "51.421907767653465,51.4230527356267,51.422934383153915,51.421680115163326",
            "numberOfTrees": 200,
            "ageOfTrees": 2,
            "calculatedSize": 9979,
            "counter": 3,
            "isActive": true,
            "visible": false,
            "location": "Tehran",
            "adminSeen": true,
            "fruit": {
              "type": "Brocoli",
              "variety": "Brocoli2"
            },
            "lastBatch": {
              "forecastProduction": 5.95,
              "lastMeasurements": "2020-01-27",
              "changes": 0,
              "averageDiameter": 71.57319079617183,
              "growthRate": -0.31,
              "predictedDiameter": 69.77,
              "predictedFruitsSizes": null,
              "predictedFruitsWeights": null
            },
            "lastHarvest": 200,
            "bloomDate": "2019-01-01",
            "harvestDate": "2020-02-01",
            "averageFruits": 200,
            "user": 231,
            "farm": 1,
            "sizeClasses": null,
            "roundsOfMeasurements": 2
          },
          {
            "fID": 371,
            "orchardName": "saeed",
            "farmer": "Saeed Hashemi",
            "gpsLatitude": "35.776136346113,35.775978034973086,35.77521694024731,35.775269439152446",
            "gpsLongitude": "51.421907767653465,51.4230527356267,51.422934383153915,51.421680115163326",
            "numberOfTrees": 200,
            "ageOfTrees": 2,
            "calculatedSize": 9979,
            "counter": 3,
            "isActive": true,
            "visible": false,
            "location": "Tehran",
            "adminSeen": true,
            "fruit": {
              "type": "Brocoli",
              "variety": "Brocoli3"
            },
            "lastBatch": {
              "forecastProduction": 5.95,
              "lastMeasurements": "2020-01-27",
              "changes": 0,
              "averageDiameter": 71.57319079617183,
              "growthRate": -0.31,
              "predictedDiameter": 69.77,
              "predictedFruitsSizes": null,
              "predictedFruitsWeights": null
            },
            "lastHarvest": 200,
            "bloomDate": "2019-01-01",
            "harvestDate": "2020-02-01",
            "averageFruits": 200,
            "user": 231,
            "farm": 1,
            "sizeClasses": null,
            "roundsOfMeasurements": 2
          },
        ]
      },
      {
        "id": 2,
        "farmName": "Farm2",
        "numberOfOrchards": 0,
        "orchards": null
      },
      {
        "id": 3,
        "farmName": "Ovidiu Rugina Farm",
        "numberOfOrchards": 0,
        "orchards": null
      },
      {
        "id": 6,
        "farmName": "Ovidiu Rugina Farm",
        "numberOfOrchards": 0,
        "orchards": null
      }
    ]
  },
  {
    "id": 3,
    "name": "GP3",
    "ownerID": 318,
    "farms": null
  },
  {
    "id": 5,
    "name": "Ovidiu Rugina Corp test",
    "ownerID": 318,
    "farms": null
  },
  {
    "id": 6,
    "name": "Ovidiu Rugina Corp",
    "ownerID": 318,
    "farms": null
  }
]

moment.locale(getBrowserLocale())
