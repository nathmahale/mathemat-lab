const { response, request } = require("express");

var calcRouter = require("express").Router();
// This middleware performs the existence and the nature of the query parameters
// If one of them is missing or with wrong format, the server return 400.

calcRouter.use(function (request, response, next) {
  // define vars
  var firstStr = request.query.first;
  var secondStr = request.query.second;
  var firstValue = parseFloat(firstStr);
  var secondValue = parseFloat(secondStr);

  if (!firstStr) {
    return error(response, {
      status: 400,
      message: "Missing required param 'firstValue'",
    });
  }
  if (!secondStr) {
    return error(response, {
      status: 400,
      message: "Missing required parameter 'secondValue'",
    });
  }
  
  if (isNaN(firstValue)) {
    return error(response, {
      status: 400,
      message: "The parameter 'firstValue' is not a number",
    });
  }

  if (isNaN(secondValue)) {
    return error(response, {
      status: 400,
      message: "The parameter 'secondValue' is not a number",
    });
  }

  // store the query parameters as numbers in the request for later usage
  request.firstValue = firstValue;
  request.secondValue = secondValue;
  next(); // go handle the request
});

calcRouter.route("/add").get(function (request, response) {
  return validResponse(response, request.firstValue + request.secondValue);
});

// Request handlers
calcRouter.route("/sub").get(function (request, response) {
  return validResponse(response, request.firstValue - request.secondValue);
});

calcRouter.route("/mul").get(function (request, response) {
  return validResponse(response, request.firstValue * request.secondValue);
});

calcRouter.route("/div").get(function (request, response) {
  if (request.secondValue == 0) {
    return error(response, {
      status: 400,
      message: "Dividing by zero is not allowed",
    });
  }
  return validResponse(response, request.firstValue / request.secondValue);
});

calcRouter.route("/expo").get(function (request, response) {
  return validResponse(response, Math.pow(request.firstValue, request.secondValue));
});

calcRouter.route("/sine").get(function (request, response) {
  return validResponse(response, Math.sin(request.firstValue));
});

calcRouter.route("/cosine").get(function (request, response) {
  return validResponse(response, Math.cos(request.firstValue));
});

calcRouter.route("/tan").get(function (request, response) {
  return validResponse(response, Math.tan(request.firstValue));
});

calcRouter.route("/acos").get(function (request, response) {
  return validResponse(response, Math.acos(request.firstValue / request.secondValue));
});

calcRouter.route("/sqrt").get(function (request, response) {
  return validResponse(response, Math.sqrt(request.firstValue));
});

// error handler function
function error(response, err) {
  response.statusCode = err.status;
  response.type("text/plain");
  response.send(err.message);
}

// valid response function
function validResponse(response, result) {
  response.type("application/json");
  response.statusCode = 200;
  response.send({ result: result });
  console.log(result);
}

module.exports = calcRouter;
