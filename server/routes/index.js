module.exports = function (app) {
  require('./auth')(app);
  require('./users')(app);
  require('./posts')(app);
  require('./likes')(app);
  require('./comments')(app);
};
