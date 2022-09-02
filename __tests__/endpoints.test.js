const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);

const data = {
  password: "a2a30e40-1ca1-11ed-b148-78e3b55232be",
};
describe("Endpoints Test", () => {
  it("should have a status code of 201", async () => {
    const resp = await request.post("/api/v1/user/login").send(data.password);
    console.log(resp.body);
    expect(resp.status).toBe(200);
  });
});
