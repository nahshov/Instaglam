const serverResponse = (res, status = 200, message = '', userDoingAction) => {
  if (userDoingAction) {
    res.status(status).json({ message, userDoingAction }).end();
  } else {
    res.status(status).json(message).end();
  }
};

module.exports = serverResponse;
