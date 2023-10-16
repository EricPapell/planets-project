const API_URL = "http://localhost:4000/v1";

async function httpGetPlanets() {
  try {
    const res = await fetch(`${API_URL}/planets`);

    return await res.json();
  } catch {
    console.error("ERROR");
  }
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  try {
    const res = await fetch(`${API_URL}/launches`);
    const fetchedLaunches = await res.json();
    return fetchedLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber;
    });
  } catch {
    console.error("ERROR LAUNCH");
  }
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    //return response with key ok and value false to trigger the else statment in the useLaunches function
    return {
      ok: false,
    };
  }
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
