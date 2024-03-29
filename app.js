/** Simple demo Express app. */

const express = require("express");
const app = express();
const { findMean, findMedian, findMode } = require("./stats.js");
const { convertStrNums } = require("./utils");

//TODO: do we need this?
// app.use(express.urlencoded());
// app.use(express.json());

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {

  if (!req.query.nums){
    throw new BadRequestError('Nums are required');
  }

  const nums = convertStrNums(req.query.nums.split(","));
  console.log(nums);
  result = findMean(nums);
  return res.json(
    {
      operation: "mean",
      value: result,
    }
  );

});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {

  if (!req.query.nums){
    throw new BadRequestError('Nums are required');
  }

  const nums = convertStrNums(req.query.nums.split(","));
  console.log(nums);
  result = findMedian(nums);
  return res.json(
    {
      operation: "median",
      value: result,
    }
  );

});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {

  if (!req.query.nums){
    throw new BadRequestError('Nums are required');
  }

  const nums = convertStrNums(req.query.nums.split(","));
  console.log(nums);
  result = findMode(nums);
  return res.json(
    {
      operation: "mode",
      value: result,
    }
  );

});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;