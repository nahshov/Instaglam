const jwt = require('jsonwebtoken');
const { tokenSecret, refreshTokenSecret } = require('../config')
const { verifyPassword, getUser } = require('../services/user-services')


function getTokens(user) {
    const created = new Date().toJSON()
    //jwt.sign creates a jwt token
    const accessToken = jwt.sign({
        sub: user._id,
        email: user.email,
        firstName: user.firstName
    }, tokenSecret, { expiresIn: '1h' })

    const refreshToken = jwt.sign({
        sub: user._id,
        email: user.email,
        created
    }, refreshTokenSecret, { expiresIn: '30d' })

    user.refreshTokenIdentifier = created
    user.save()
    return {
        access_token: accessToken,
        refresh_token: refreshToken
    }
}

module.exports = function (app) {
    app.post('/api/login', async function (req, res) {
        const { email, password } = req.body || {}

        try {
            const user = await getUser(email)
            if (!(user && verifyPassword(user, password))) {
                console.log(user)
                res.status(401).json({ message: 'Invalid email or password' }).end()
            }
            res.status(200).json({ payload: getTokens(user) }).end()
        } catch (e) {
            res.status(500).json({ message: 'Internal server error when trying to login' }).end()
        }
    })

    app.post('/api/token/refresh', async function (req, res) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]

            try {
                jwt.verify(token, refreshTokenSecret, function (error, message) {
                    console.log(error)
                    console.log(message)
                })
                // const user = await getUser(email)
                // if (created === user.refreshTokenIdentifier) {
                //     res.status(200).json({ payload: getTokens(user) }).end()
                // }
            } catch (e) {
                res.status(500).json({ message: 'Internal server error' }).end()
            }
        }
        res.status(401).json({ message: 'Unauthorized' }).end()
    })
}