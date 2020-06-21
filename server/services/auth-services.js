const { setUserToken, verifyToken } = require('./user-services');
const jwt = require('jsonwebtoken');
const { tokenSecret, cookieSecret } = require('../config');

const TEN_MINUTES = 1000 * 60 * 10;

function setAuthCookie() {

}

async function verifyUser(req, res, next) {
	try {
		if (req.cookies.token) {
			const decoded = await jwt.verify(req.cookies.token, cookieSecret);
			if ((Date.now() - new Date(decoded.created)) > TEN_MINUTES) {
				const user = await verifyToken(decoded);
				await setUserToken(user, Date.now());
			} else {
				req.user = decoded;
				next();
			}
		} else if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			const decoded = await jwt.verify(token, tokenSecret);
			req.user = decoded;
			next();
		} else {
			throw new Error('Invalid token');
		}
	} catch (e) {
		return res.status(401).json({ message: 'you are not authorized' }).end();
	}
}

module.exports = { verifyUser, setAuthCookie }
