//server
const http = require("http");
//function to acces .env data
require("dotenv").config();

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.module");
const { mongoConnect } = require("./services/mongo");
const { loadLaunchData } = require("./models/launches.model");

//PORT TO LISTEN
const PORT = process.env.PORT || 4000;

//CREATE THE SERVER
const server = http.createServer(app);

//here we are adding an async function to load the data before the server listen to the PORT
async function startServer() {
  //aqui agregamos la conexion antes de correr el servidor para que la data ya este accesible
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(PORT);
  });
}

startServer();
