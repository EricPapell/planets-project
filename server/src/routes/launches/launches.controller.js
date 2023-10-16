const {
  existLaunchId,
  getAllLaunches,
  scheduleLaunch,
  abortMision,
} = require("../../models/launches.model");
const { getPagination } = require("../../services/query");

//GET
//GET
async function httpGetAllLaunches(req, res) {
  //to see the queries(params added in the url string)
  console.log(req.query);
  //function to calculate pagination
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

//POST
//POST
async function httpAddNewlLaunches(req, res) {
  const launch = req.body;
  console.log(launch);

  //checking if there are missing information
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate).valueOf();
  //checking if the date format is correct to transform to a date value
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  //addNewLaunch(launch);
  await scheduleLaunch(launch);
  return res.status(201).json(launch);
}

//DELETE
//DELETE
async function httpDeletelLaunches(req, res) {
  const launchId = Number(req.params.id);
  console.log(launchId);
  const existLaunch = await existLaunchId(launchId);
  if (!existLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = await abortMision(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewlLaunches,
  httpDeletelLaunches,
};
