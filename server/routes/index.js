module.exports = function(app) {
	require('./users')(app);
	require('./posts')(app);
	require('./likes')(app);
};
