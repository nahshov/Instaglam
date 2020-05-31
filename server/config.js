module.exports = {
	mongoUri           :
		process.env.MONGO_URI || 'mongodb://localhost:27017/instaglam',
	port               : process.env.PORT || 3000,
	tokenSecret        : process.env.TOKEN_SECRET || 'mySecret',
	refreshTokenSecret : process.env.REFRESH_TOKEN || 'myRefresh'
};
