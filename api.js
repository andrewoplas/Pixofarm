api = {
    Endpoint: 'webapi.pixofarm.com/api/',
    'Code Status Description': {
        200: 'OK The request was successfully completed.',
        201: 'Created A new resource was successfully created.',
        400: 'Bad Request The request was invalid.',
        401: 'Unauthorized The request did not include an authentication token or the authentication token was expired.',
        403: 'Forbidden The client did not have permission to access the requested resource.',
        404: 'Not Found The requested resource was not found.',
        409: 'Conflict The request could not be completed due to a conflict. For example, POST ',
    },
    path: {
        'token-auth/': {
            Method: 'Get',
            Parameters: {
                username: 'str',
                password: 'str',
            },
            Response: { "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX…." },
        },
        'token-auth-refresh/': {
            Method: 'Get',
            Parameters: {
                username: 'str',
                password: 'str',
            },
            Response: { "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX…." },
        },
        'all-of-users/': {
            Method: 'Get',
            Parameters: null,
            Response: {
                "status": "200",
                "data": [
                    {
                        "id": 6,
                        "first_name": "",
                        "email": "",
                        "address": null,
                        "province": null,
                        "city": null,
                        "village": null,
                        "mobilenumber": "1",
                        "date_joined": "2019-06-11T15:12:19.814450Z",
                        "last_login": "2019-11-04T11:31:23.581280Z"
                    }
                ]
            }
        },
        'all-of-corps/': {
            Method: 'Get',
            Parameters: null,
            Response: {
                "status": "200",
                "data": [
                    {
                        "id": 6,
                        "first_name": "",
                        "email": "",
                        "address": null,
                        "province": null,
                        "city": null,
                        "village": null, "mobilenumber": "1",
                        "date_joined": "2019-06-11T15:12:19.814450Z",
                        "last_login": "2019-11-04T11:31:23.581280Z"
                    }
                ]
            }
        },
        'all-of-holdings/': {
            Method: 'Get',
            Parameters: null,
            Response: {
                "status": "200",
                "data": [
                    {
                        "id": 6,
                        "first_name": "",
                        "email": "",
                        "address": null,
                        "province": null,
                        "city": null,
                        "village": null,
                        "mobilenumber": "1",
                        "date_joined": "2019-06-11T15:12:19.814450Z",
                        "last_login": "2019-11-04T11:31:23.581280Z"
                    },
                ]
            },
        },
        'user-mng/': {
            Method: 'Post',
            Description: 'Create new user',
            Parameters: {
                firstname: 'str',
                mobilenumber: 'str',
                email: 'str',
            },
            Response: null,
        },
        'staff-mng/': {
            Method: 'Post',
            Description: 'Create new Holding & Corporate',
            Parameters: {
                username: 'str',
                firstname: 'str',
                mobilenumber: 'str',
                email: 'str',
                type: 'int',//** 1 for create Holding & 2 for create Corporate **
                logo: 'str',//# mandatory field – base64 image
            },
            Response: null,
        },
        'user-types/': {
            Method: 'GET',
            Description: '',
            Parameters: null,
            Response: {
                "status": "200",
                "data": [
                    {
                        "typeID": 0,
                        "type": "Manager"
                    },
                    {
                        "typeID": 1,
                        "type": "Analyst"
                    },
                    {
                        "typeID": 2,
                        "type": "Farmer"
                    }
                ]
            },
        },
        'user-profile/': {
            Method: 'GET',
            Description: 'Get user profile (it is useful for after authentication user in login form)',
            Parameters: null,
            Response: {
                "status": "200",
                "data": {
                    "id": 232,
                    "first_name": "Peyman",
                    "email": "",
                    "address": null,
                    "province": null,
                    "city": null,
                    "village": null,
                    "mobilenumber": "989191459277",
                    "date_joined": "2019-12-29T08:10:16.870394Z",
                    "last_login": null,
                    "user_type": 2, // 0 for manager, 1 analyst, 2 for farmer, null for other types
                    "user_role ": {
                        "typeId": 2,
                        "typeName": "Farmer"
                    }
                },
            },
        },
        'edit-user/': {
            Method: 'PATCH',
            Description: 'Edit user full name and change user type',
            Parameters: {
                fist_name: 'str',
                user_type: 'int',
                email: 'str',
            },
            Response: null,
        },
        'create-user/': {
            Method: 'PATCH',
            Description: 'Create new user for a corporate by sending these valuse: fist_name(str), mobilenumber(str), email(str), user_type(int)',
            Parameters: {
                fist_name: 'str',
                mobilenumber: 'str',
                email: 'str',
                user_type: 'int',
            },
            Response: null,
        },
        'create-group/': {
            Method: 'post',
            Description: 'Create new group container for give access to users',
            Parameters: {
                name: 'str',
            },
            Response: null,
        },
        'create-farm/': {
            Method: 'post',
            Description: 'Create new farm container to manage orchard. farms can be assigned to a group',
            Parameters: {
                name: 'str',
                group: 'int id', //optional
            },
            Response: null,
        },
        'edit-group/': {
            Method: 'post',
            Description: 'Update Farm name or assign farm to group',
            Parameters: {
                id: 'int',
                name: 'str',
                group: 'int',
            },
            Response: null,
        },
        'create-orchard/': {
            Method: 'post',
            Description: 'Create new orchard and assign it to Farmer user type and also it can be assigned to a farm.',
            Parameters: {
                orchardName: '', //String(max=20)
                orchardSize: 0, //integer
                calculatedSize: 0, //integer (which is calculated by google API)
                location: '', //str (by google API)
                numberOfTrees: 0, //integer
                ageOfTrees: 0, //integer
                fruit: 0, //integer(id)
                lastHarvest: 0, //integer 
                averageFruits: 0, //integer
                bloomDate: '', //date
                harvestDate: '', //date
                gpsLatitude: '', //string (separated by comma like: 2.0156840,84.15701,31.180847,42.1740745)
                gpsLongitude: '', //string (separated by comma like: 2.0156840,84.15701,31.180847,42.1740745)
                user: 0, //integer (farmer id) 
                farm: 0, //integer (farm id) *optional                 
            },
            Response: null,
        },
        'list-orchards/': {
            Method: 'get',
            Description: 'Get list of all orchards for this user type... if user type is corp or manager can see all of the orchards,',
            Parameters: null,
            Response:
            {
                "status": "200",
                "data": [
                    {
                        "fID": 160,
                        "orchardName": "Fede",
                        "farmer": "Demo Pixofarm",
                        "gpsLatitude": "46.459801768318115,46.45814691887793,46.454666374267156,46.45627282488286",
                        "gpsLongitude": "11.313223019242285,11.318946182727814,11.316861771047114,11.31060853600502",
                        "numberOfTrees": 100,
                        "ageOfTrees": 5,
                        "calculatedSize": 211938,
                        "counter": 100,
                        "isActive": true,
                        "visible": false,
                        "location": "Frangarto",
                        "adminSeen": true,
                        "fruit": {
                            "name": "Pear",
                            "variety": "Carmen"
                        },
                        "lastBatch": {
                            "forecastProduction": null,
                            "lastMeasurements": "2019-12-11",
                            "changes": 0
                        },
                        "lastHarvest": 5,
                        "bloomDate": "2019-07-16",
                        "harvestDate": "2019-10-30",
                        "averageFruits": null,
                        "user": 52,
                        "farm": null
                    },
                    {
                        "fID": 296,
                        "orchardName": "FRAGSBURG",
                        "farmer": "Demo Pixofarm",
                        "gpsLatitude": "47.85259386414518,47.85378896427211,47.85390415319047,47.85308342656376,47.852680257849,47.852435475314344,47.85208989800419,47.85223388882995",
                        "gpsLongitude": "10.515280723702746,10.515881538522082,10.518005848061875,10.517920017373399,10.518091678750352,10.51819896711095,10.517662525307971,10.516203403603871",
                        "numberOfTrees": 3448,
                        "ageOfTrees": null,
                        "calculatedSize": 8827,
                        "counter": 240,
                        "isActive": true,
                        "visible": false,
                        "location": "Wolfholz", "adminSeen": true,
                        "fruit": {
                            "name": "Apple",
                            "variety": "Golden"
                        },
                        "lastBatch": null,
                        "lastHarvest": 200,
                        "bloomDate": "2018-05-16",
                        "harvestDate": "2018-08-28",
                        "averageFruits": 200,
                        "user": 286,
                        "farm": null
                    }
                ]
            },
        },
        'orchard-details/': {
            Method: 'get',
            Description: 'Get details of each orchard',
            Parameters: {
                fid: 'int'
            },
            Response:
            {
                "status": "200",
                "data": {
                    "fID": 303,
                    "orchardName": "Fruit Logistica",
                    "farmer": "Demo Pixofarm",
                    "gpsLatitude": "52.50836610943138,52.507438219115905,52.50433932756728,52.50198026854327,52.499013458335746,52.50220456725585,52.50418912220174,52.506306643936284,52.51009286789337,52.51012266010531",
                    "gpsLongitude": "13.26176807284355,13.262085914611816,13.267478160560131,13.266428411006927,13.272574357688427,13.275923766195774,13.279527984559536,13.279577605426313,13.276990950107574,13.268708623945713",
                    "numberOfTrees": 800,
                    "ageOfTrees": 12,
                    "calculatedSize": 916243,
                    "counter": 14736,
                    "isActive": true,
                    "visible": false,
                    "location": "Berlin Wilmersdorf",
                    "adminSeen": true,
                    "fruit": {
                        "type": "Apple",
                        "variety": "Royal Gala"
                    },
                    "lastBatch": {
                        "forecastProduction": null,
                        "lastMeasurements": "2020-03-04",
                        "changes": 0
                    },
                    "lastHarvest": 350,
                    "bloomDate": "2019-10-27",
                    "harvestDate": "2020-04-28", "averageFruits": null,
                    "user": 286,
                    "farm": null
                }
            },
        },
        'groups-farms/': {
            Method: 'get',
            Description: 'Get list of groups and farms. this API returns List of groups farms and number of orchards and orchards (it can be used for top left filter menu)',
            Parameters: null,
            Response:
            {
                "status": "200",
                "data": [
                    {
                        "id": 1,
                        "name": "GP1",
                        "ownerID": 243,
                        "farms": null
                    },
                    {
                        "id": 2,
                        "name": "GP2",
                        "ownerID": 243,
                        "farms": [
                            {
                                "id": 1,
                                "farmName": "Farm1",
                                "numberOfOrchards": 0,
                                "orchards": null
                            },
                            {
                                "id": 2,
                                "farmName": "Farm2",
                                "numberOfOrchards": 4,
                                "orchards": [
                                    {
                                        "fID": 323,
                                        "orchardName": "DeRust",
                                        "farmer": "René Bal",
                                        "gpsLatitude": "-34.161643937588615,-34.161622853174464,-34.16191276340755,-34.163141194956786,-34.163171711321475",
                                        "gpsLongitude": "19.082857333123687,19.084209837019444,19.08499337732792,19.08493872731924,19.082883819937706",
                                        "numberOfTrees": 16,
                                        "ageOfTrees": null,
                                        "calculatedSize": 31643,
                                        "counter": 592,
                                        "isActive": true,
                                        "visible": false,
                                        "location": "Grabouw",
                                        "adminSeen": true,
                                        "fruit": {
                                            "type": "Apple",
                                            "variety": "Kiku"
                                        },
                                        "lastBatch": null,
                                        "lastHarvest": 80,
                                        "bloomDate": "2019-10-14",
                                        "harvestDate": "2020-04-15",
                                        "averageFruits": null,
                                        "user": 289,
                                        "farm": 2

                                    },
                                    {
                                        "fID": 321,
                                        "orchardName": "DeRust HVHB",
                                        "farmer": "René Bal",
                                        "gpsLatitude": "-34.163310144510135,-34.16326658940311,-34.16175490810265,-34.161608149566746,-34.16170497138938",
                                        "gpsLongitude": "19.082877784967426,19.08502422273159,19.085012823343277,19.08420581370592,19.08292304724455",
                                        "numberOfTrees": 4,
                                        "ageOfTrees": null,
                                        "calculatedSize": 35125,
                                        "counter": 640,
                                        "isActive": true,
                                        "visible": false,
                                        "location": "Grabouw",
                                        "adminSeen": true,
                                        "fruit": {
                                            "type": "Apple",
                                            "variety": "Kiku"
                                        },
                                        "lastBatch": null,
                                        "lastHarvest": 80,
                                        "bloomDate": "2020-10-07",
                                        "harvestDate": "2020-04-15",
                                        "averageFruits": null,
                                        "user": 289,
                                        "farm": 2
                                    },
                                    {
                                        "fID": 324,
                                        "orchardName": "DR LV LB",
                                        "farmer": "René Bal",
                                        "gpsLatitude": "-34.16169248720645,-34.163115394748914,-34.16314230464296,-34.161923583004636,-34.161631730823174",
                                        "gpsLongitude": "19.083022624254227,19.082878455519676,19.08495582640171,19.085047021508217,19.084186032414436",
                                        "numberOfTrees": 4,
                                        "ageOfTrees": null,
                                        "calculatedSize": 10000,
                                        "counter": 200,
                                        "isActive": true,
                                        "visible": false,
                                        "location": "Grabouw",
                                        "adminSeen": true,
                                        "fruit": {
                                            "type": "Apple",
                                            "variety": "Kiku"
                                        },
                                        "lastBatch": {
                                            "forecastProduction": null,
                                            "lastMeasurements": "2020-02-28",
                                            "changes": 0
                                        },
                                        "lastHarvest": 80,
                                        "bloomDate": "2019-10-10",
                                        "harvestDate": "2020-04-09",
                                        "averageFruits": 272,
                                        "user": 289,
                                        "farm": 2
                                    },
                                    {
                                        "fID": 322,
                                        "orchardName": "DeRust HVLB",
                                        "farmer": "René Bal",
                                        "gpsLatitude": "-34.16328018303765,-34.163202227675164,-34.16185700084674,-34.161674731920876,-34.16165004097068",
                                        "gpsLongitude": "19.08293344080448,19.085007458925247,19.084953479468822,19.084145464003083,19.082842580974102",
                                        "numberOfTrees": 4,
                                        "ageOfTrees": null,
                                        "calculatedSize": 32904,
                                        "counter": 608,
                                        "isActive": true,
                                        "visible": false,
                                        "location": "Grabouw",
                                        "adminSeen": true,
                                        "fruit": {
                                            "type": "Apple",
                                            "variety": "Kiku"
                                        },
                                        "lastBatch": null,
                                        "lastHarvest": 80,
                                        "bloomDate": "2019-10-07",
                                        "harvestDate": "2020-04-14",
                                        "averageFruits": null,
                                        "user": 289,
                                        "farm": 2
                                    }
                                ]
                            },
                            {
                                "id": 3,
                                "farmName": "Farm3",
                                "numberOfOrchards": 0,
                                "orchards": null
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "name": "GP3",
                        "ownerID": 243,
                        "farms": null
                    }
                ]
            },
        },
        'historical-orchard-data/?fid=266': {
            Method: 'get',
            Description: '',
            Parameters: null,
            Response: {
                "status": "200",
                "data": [
                    {
                        "id": 361,
                        "date": "2020-01-01",
                        "averageDiameter": 84.8433333333333,
                        "predictedDiameter": 0.0,
                        "growthRate": 0.0,
                        "totalForecastProduction": 0.0
                    },
                    {
                        "id": 362,
                        "date": "2020-01-27",
                        "averageDiameter": 75.3133333333333,
                        "predictedDiameter": 69.77,
                        "growthRate": 69.77,
                        "totalForecastProduction": 5.95
                    }
                ]
            },
        },
        'edit-orchard/?fid=266': {
            Method: 'get',
            Description: '',
            Parameters: null,
            Response: null,
        },
        'fruits-varieties/': {
            Method: 'get',
            Description: 'fruit type and variety API (that can be useful for create orchard)',
            Parameters: null,
            Response: {
                "status": "200",
                "data": [
                    {
                        "Apple": {
                            "Ambrosia": 11,
                            "Braeburn": 12,
                            "Brookfield": 13,
                            "Choupette": 14,
                            "Crimson Snow": 15,
                            "Cripps Pink": 16,
                        }
                    }
                ]
            },
        },
    },
}
examples = () => {
    fetch("https://webapi.pixofarm.com/api/all-of-users/", {
        headers: {
            authorization: `JWT ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
        body: null,
        method: "GET",
    });
    fetch("https://webapi.pixofarm.com/api/all-of-corps/", {
        headers: {
            authorization: `JWT ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
        body: null,
        method: "GET",
    });
    fetch("https://webapi.pixofarm.com/api/all-of-holdings/", {
        headers: {
            authorization: `JWT ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
        body: null,
        method: "GET",
    });
    fetch("https://webapi.pixofarm.com/api/user-profile/", {
        headers: {
            authorization: `JWT ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
        body: null,
        method: "GET",
    });
    fetch("https://webapi.pixofarm.com/api/groups-farms/", {
        headers: {
            authorization: `JWT ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
        body: null,
        method: "GET",
    });
    fetch("https://webapi.pixofarm.com/api/orchard-details/", {
        headers: {
            authorization: `JWT ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
        body: null,
        method: "GET",
    });
    fetch("https://webapi.pixofarm.com/api/list-orchards/", {
        headers: {
            authorization: `JWT ${JSON.parse(localStorage.getItem('currentUser')).token}`,
        },
        body: null,
        method: "GET",
    });
    fetch("https://webapi.pixofarm.com/api/create-orchard/", {
        headers: {
            authorization: `JWT ${JSON.parse(localStorage.getItem('currentUser')).token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orchardName: 'testonoff', //String(max=20)
            orchardSize: 100, //integer
            calculatedSize: 211938, //integer (which is calculated by google API)
            location: 'Frangarto', //str (by google API)
            numberOfTrees: 100, //integer
            ageOfTrees: 5, //integer
            fruit: 1, //integer(id)
            //fruit: {"name": "Pear","variety": "Carmen"},
            lastHarvest: 5, //integer 
            averageFruits: 1, //integer
            bloomDate: '2020-02-02', //date
            harvestDate: '2020-02-02', //date
            gpsLatitude: '46.459801768318115,46.45814691887793,46.454666374267156,46.45627282488286', //string (separated by comma like: 2.0156840,84.15701,31.180847,42.1740745)
            gpsLongitude: '11.313223019242285,11.318946182727814,11.316861771047114,11.31060853600502',
            user: 318, //integer (farmer id) 
            //farm: null, //integer (farmer id) 
        }),
        method: "POST",
    });
    fetch("https://webapi.pixofarm.com/api/edit-user/", {
        headers: {
            authorization: `JWT ${JSON.parse(localStorage.getItem('currentUser')).token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            logo: ''
        }),
        method: "PATCH",
    });
}