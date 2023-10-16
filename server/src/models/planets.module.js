const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planets = require("./planets.mongo");

// const habitablePlanets = [];

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] <= 1.11 &&
    planet["koi_insol"] >= 0.36 &&
    planet["koi_prad"] <= 1.6
  );
}

// const promise = new Promise((resolve, reject) => {
//   resolve(42);
// });
// promise.then((result) => whatever);
// or;
// const reuslt = await promise;
// whatever;

//to async the function that will populate the array habitablePlanets
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitable(data)) {
          // habitablePlanets.push(data);
          savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(countPlanetsFound, " planets could be habitable");
        resolve();
      });
  });
}

//normal
// function getAllPlanets() {
//   return habitablePlanets;
// }

//mongoDB
//find the object with that key/value
async function getAllPlanets() {
  return await planets.find(
    {},
    //to establish what do you want to return from this object
    //or as a string like 'propertyName anotherName -excludedName'
    {
      //0 gonna be exclude  // 1 gonna be shown
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanets(planet) {
  try {
    //TO PUSH/CREATE DATA TO THE DATABASE
    //insert + update =upsert
    //the first parametter is to see if the data (data.kepler_name) is the same as the data stored(keplerName)
    //the second parametter is what is going to insert(in case it doesnt exist, or update(in case it already exists))
    //the third argument is to upsert functionality to true
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Couldn't save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};

//////BEEEE SUUURE THAT FORNT END FETCH IS CALLING TO THE RIGHT DIRECTION
