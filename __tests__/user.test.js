const { app } = require("../app");
const supertest = require("supertest");
const pgsql = require("../src/Database/testdatabase/testDb");
const request = supertest(app);
const { beforeAll, beforeEach, afterEach } = require("@jest/globals");

describe("User Endpoints", () => {
  beforeAll(async () => {
    try {
      await pgsql.connect();
    } catch (error) {
      await error;
    }
  });
  beforeEach(async () => {
    try {
      await pgsql.query(
        "CREATE TABLE User_test (user_id varchar PRIMARY KEY NOT NULL,first_name varchar(30) NOT null,last_name varchar(30) NOT NULL,username varchar(30) UNIQUE NOT NULL ,age int NOT NULL,email varchar(30) UNIQUE NOT NULL,jpassword varchar(200) NOT NULL,is_verified boolean DEFAULT FALSE,role USER_ROLE DEFAULT 'User',gender varchar(30) NOT NULL,display_picture varchar(100) NOT NULL)",
        (err, res) => {}
      );
    } catch (error) {
      await error;
    }
  });

  afterEach(async () => {
    try {
      await pgsql.query("DROP TABLE TEST_USERS", (err, res) => {
        pgsql.end();
      });
    } catch (error) {
      await error;
    }
  });
  function sum(a, b) {
    return a + b;
  }
  test("adds 6 + 8 to equal 14", () => {
    expect(sum(6, 8)).toBe(14);
  });
  // const payload = {
  //   password: "123456789",
  //   email: "test58@gmail.com",
  // };
  // it("should have a status code of 201", async () => {
  //   const resp = await request.post("/api/v1/user/login").send(payload);
  //   expect(resp.status).toBe(200);
  // });
});
