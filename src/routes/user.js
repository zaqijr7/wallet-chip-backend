// ======== Server
// import all modules
const express = require('express')
const upload = require('../helpers/upload')

// import all controllers
const userController = require('../controllers/userController')

// import all middlewares
const userMiddleware = require('../middlewares/user')
const authMiddleware = require('../middlewares/auth')

// init router
const router = express.Router()

router.get(
  '/dashboard/profile',
  authMiddleware.authCheck,
  userController.getUserDetails
)

router.patch(
  '/dashboard/update-profile',
  authMiddleware.authCheck,
  userController.updateUserDetails
)

router.get(
  '/user',
  authMiddleware.authCheck,
  userMiddleware.isGetUsersListValid,
  userController.getAllUsers
)

router.get(
  '/receiver/:id',
  authMiddleware.authCheck,
  userMiddleware.isGetUsersListValid,
  userController.getReceiverDetails
)

router.patch(
  '/user/password/:id',
  authMiddleware.authCheck,
  userMiddleware.checkResetPassword,
  userController.resetPassword
)

router.patch(
  '/user/:id',
  authMiddleware.authCheck,
  userMiddleware.checkEditProfile,
  userController.editProfile
)

router.patch(
  '/user/picture/:id',
  authMiddleware.authCheck,
  userMiddleware.checkUploadFile,
  upload,
  userController.upload
)

module.exports = router
