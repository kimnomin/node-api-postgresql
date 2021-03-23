const app = require("../server");
const request = require("supertest");

describe("Client API Test Suite.", () => {
  it("Get Clients List", (done) => {
    request(app)
      .get("/clients")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // console.log(res.body);
        done();
      });
  });

  it("Get Client By Id", (done) => {
    request(app)
      .get("/clients/1")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // console.log(res.body);
        done();
      });
  });
});
