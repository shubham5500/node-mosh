function logger(req, res, next) {
  next(); // to pass to the next middleware without this the req would hang..
}
module.exports = {
    logger,
}