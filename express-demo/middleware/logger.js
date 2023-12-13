function logger(req, res, next) {
  console.log("Logging...");
  next(); // to pass to the next middleware without this the req would hang..
}
module.exports = {
    logger,
}