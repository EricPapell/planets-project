const { getAllPlanets } = require("../../models/planets.module");

//normal
// function httpGetAllPlanets(req, res) {
//   return res.status(200).json(getAllPlanets());
// }

//with mongoDB
async function httpGetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
