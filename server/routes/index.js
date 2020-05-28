module.exports = function(app) {
	require('./user')(app);
	require('./posts')(app)
};


