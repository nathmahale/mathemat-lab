var request = require("supertest");

var app = require("../app").app;

describe("Calculator unit tests", function () {
  it("happy case add", function (done) {
    request(app)
      .get("/calculator/add?first=1.2&second=3.4")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        result: 1.2 + 3.4,
      })
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("happy case sub", function (done) {
    request(app)
      .get("/calculator/sub?first=1.2&second=3.4")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        result: 1.2 - 3.4,
      })
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("happy case multiply", function (done) {
    request(app)
      .get("/calculator/mul?first=1.2&second=3.4")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        result: 1.2 * 3.4,
      })
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("happy case divide", function (done) {
    request(app)
      .get("/calculator/div?first=1.2&second=3.4")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        result: 1.2 / 3.4,
      })
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("happy case exponential", function (done) {
    request(app)
      .get("/calculator/expo?first=2&second=2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        result: Math.pow(2, 2),
      })
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("missing param 'first'", function (done) {
    request(app)
      .get("/calculator/add?second=3.4")
      .expect("Content-Type", /text/)
      .expect(400, "Missing required param 'first'")
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("missing parameter 'second'", function (done) {
    request(app)
      .get("/calculator/add?first=1.2")
      .expect("Content-Type", /text/)
      .expect(400, "Missing required parameter 'second'")
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("wrong parameter 'first'", function (done) {
    request(app)
      .get("/calculator/add?first=hello&second=3.4")
      .expect("Content-Type", /text/)
      .expect(400, "The parameter 'first' is not a number")
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("wrong parameter 'second'", function (done) {
    request(app)
      .get("/calculator/add?first=1.2&second=world")
      .expect("Content-Type", /text/)
      .expect(400, "The parameter 'second' is not a number")
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("dividing by zero", function (done) {
    request(app)
      .get("/calculator/div?first=1.2&second=0")
      .expect("Content-Type", /text/)
      .expect(400, "Dividing by zero is not allowed")
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("happy case sine", function (done) {
    request(app)
      .get("/calculator/sine?first=1&second=30")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        result: Math.sin(1),
      })
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("happy case cosine", function (done) {
    request(app)
      .get("/calculator/cosine?first=30&second=30")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        result: Math.cos(30),
      })
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("happy case tan", function (done) {
    request(app)
      .get("/calculator/tan?first=30&second=30")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        result: Math.tan(30),
      })
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("happy case acos", function (done) {
    request(app)
      .get("/calculator/acos?first=8&second=10")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        result: Math.acos(8 / 10),
      })
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("happy case sqrt", function (done) {
    request(app)
      .get("/calculator/sqrt?first=625")
      .set("Accept", /text/)
      .expect(Math.sqrt(625))
      .end(function (err) {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  
});
