const request = require("supertest");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const app = require("../../../src/app");
const { loadPlanetsData } = require("../../models/planets.module");
const { loadPlanetsData } = require("../../models/planets.module");

//BIG DESCRIBE TEST TO KEEP ALL IN ONE FUNCTION
//AND THAT WAY WE CAN INVOKE ONCE THE MONGODB DATA TO BE TESTED
describe("Launches API", () => {
  //before calling the methods, we dothis to read MONGO DATA
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });

  //after all we disconnect to not keep the connection forever
  afterAll(async () => {
    await mongoDisconnect();
  });

  // describe("Test GET /launches", () => {
  //   test("It should respond with 200 succes", async () => {
  //     const response = await request(app).get("/launches");
  //     expect(response.statusCode).toBe(200);
  //   });
  // });
  describe("Test GET /launches", () => {
    test("It should respond with 200 succes", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  ////////////////////
  ////////////////////
  describe("Test Post /launches", () => {
    const completeLaunchData = {
      launchDate: "July 24, 2024",
      mission: "Poqui-33",
      rocket: "TilapiaGold",
      target: "Kepler-62 f",
    };
    const launchWithoutDate = {
      mission: "Poqui-33",
      rocket: "TilapiaGold",
      target: "Kepler-62 f",
    };
    const launchWithInvalidDate = {
      launchDate: "ey",
      mission: "Poqui-33",
      rocket: "TilapiaGold",
      target: "Kepler-62 f",
    };
    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      console.log(response.body);
      //to test the date
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = response.body.launchDate;

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchWithoutDate);
    });
    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });
    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchWithInvalidDate)
        .expect("Content-type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
