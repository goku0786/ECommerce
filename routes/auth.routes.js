const authController = require('../controllers/auth.controller')
const authMiddleWare = require('../middlewares/auth.mw')

module.exports = (app) => {
    app.post('/ecomm/api/v1/auth/signup', [authMiddleWare.verifySignupBody], authController.signup)

    app.post('/ecomm/api/v1/auth/signin', [authMiddleWare.verifySigninBody], authController.signin)
}