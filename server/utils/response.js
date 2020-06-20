const response = (res, status = 200, message = '') =>
  res.status(status).json(message).end();

module.exports = response;
