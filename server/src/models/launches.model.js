//importing the model from MONGODB
const launches = require("./launches.mongo");
const planets = require("./planets.mongo");
//helps with https requests
const axios = require("axios");

//here the map creation
//const launches = new Map();

//
// let latestFlightNumber = 100;
const DEFAULT_LAST_FLIGHTNUMBER = 100;

//here the object js
// const launch = {
//   flightNumber: 100, //flight_number
//   mission: "Kepler-exploration x", //name
//   rocket: "Explorer ISO21", //rocket.name
//   launchDate: new Date("August 31,267"), //date_local
//   target: "Kepler-1652 b", //not applicable
//   customers: ["ZTM", "Nasa"], // comes from payloads.customers
//   upcoming: true, //upcoming
//   succes: true, //succes
// };

SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";
//FUNCTION TO FETCH DATA FROM SPACEX
async function populateLaunches() {
  console.log("SAPCEX");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("Problem downloading launch data");
    throw new Error("Launch data download failed");
  }

  const launchDocs = response.data.docs;
  for (const launchDateoc of launchDocs) {
    const payloads = launchDateoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });
    const launch = {
      flightNumber: launchDateoc["flight_number"],
      mission: launchDateoc["name"],
      rocket: launchDateoc["rocket"]["name"],
      launchDate: launchDateoc["date_local"],
      customers,
      upcoming: launchDateoc["upcoming"],
      succes: launchDateoc["succes"],
    };
    console.log(launch);
    await saveLaunch(launch);
  }
}

//function to load SPACEXDATA from its API
async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("DATA ALREADY EXIST");
    return;
  } else {
    populateLaunches();
  }
}

//REUSABLE function to find if the data is already downoladed
async function findLaunch(filter) {
  return await launches.findOne(filter);
}

//function to save to database

//here to set (from which object, what info)
// launches.set(launch.flightNumber, launch);
//here to get one launch
// launches.get(100);
// console.log(launches);

//funtion to see if the flight exists
async function existLaunchId(launchedId) {
  return await findLaunch({
    flightNumber: launchedId,
  });
}

//function to get latest flightNumber
//we find the launches and sort them depending the flightNumber and find the highest(latest one)
async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");
  console.log(latestLaunch);
  if (!latestLaunch) {
    return DEFAULT_LAST_FLIGHTNUMBER;
  }
  return latestLaunch.flightNumber;
}

//function to get all launches
async function getAllLaunches(skip, limit) {
  //return Array.from(launches.values());
  return await launches
    .find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    )
    .sort({ flightNumber: 1 })
    //to divide the data in limits and pagination
    .skip(skip)
    .limit(limit);
}

//to save launches to MONGODB
async function saveLaunch(launch) {
  //to upsert
  //findOneAndUpdate to not send more info
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

// //function to add launches to the lis of laucnhes
// function addNewLaunch(launch) {
//   latestFlightNumber++;

//   launches.set(
//     latestFlightNumber,
//     //here we copy and redo the object to create an other object
//     //the variables set are for all ones. The other info is set through the client
//     Object.assign(launch, {
//       succes: true,
//       upcoming: true,
//       flightNumber: latestFlightNumber,
//       customers: ["ZTM", "Nasa"],
//     })
//   );
// }

//FUNCTION TO POST DATA TO MONGODB
async function scheduleLaunch(launch) {
  //to verify if the planet exists
  const targetPlanet = await planets.findOne({ keplerName: launch.target });
  console.log("TARGET:", targetPlanet);
  if (!targetPlanet) {
    throw new Error("NO MATCHES PLANET FOUND");
  }
  //creating new flightNumber id
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    succes: true,
    upcoming: true,
    flightNumber: newFlightNumber,
    customers: ["ZTM", "Nasa"],
  });
  //saving to mongoDB
  await saveLaunch(launch);
}

// //function to delete a flight based on its id
// function abortMision(launchedId) {
//   // return launches.delete(launchedId);
//   //obteniendo una copia del objeto launches
//   const aborted = launches.get(launchedId);
//   //mutando sus variables
//   aborted.upcoming = false;
//   aborted.succes = false;
//   //retornando el objeto
//   return aborted;
// }

//function to delete a flight based on its id MONGODB
async function abortMision(launchedId) {
  //only update here WITHOUT UPSERTING
  const aborted = await launches.updateOne(
    {
      flightNumber: launchedId,
    },
    {
      upcoming: false,
      succes: false,
    }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  loadLaunchData,
  existLaunchId,
  getAllLaunches,
  scheduleLaunch,
  abortMision,
};
