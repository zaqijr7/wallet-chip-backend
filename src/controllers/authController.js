// ==== import module
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailer = require('../helpers/mailer')
const response = require('../helpers/response')
const { SECRET, REACT_APP_URL } = process.env

// ===== import models
const userModel = require('../models/User')

exports.createPin = async (req, res) => {
  try {
    const results = await userModel.findByCondition({
      id: req.query.id
    })

    if (results.length < 1) {
      return response(res, 400, false, 'Failed to create pin, unknown user id')
    } else {
      try {
        const results = await userModel.findByCondition({
          id: req.query.id
        })

        if (results[0].pin) {
          return response(res, 400, false, 'Failed to create pin, pin already there')
        } else {
          try {
            const pin = await bcrypt.hash(req.body.pin, 8)
            const results = await userModel.create(req.query.id, pin)

            if (!results) {
              return response(res, 400, false, 'Failed to create pin')
            } else {
              return response(res, 200, true, 'Success to create pin')
            }
          } catch (err) {
            console.log(err)
            return response(res, 500, false, 'Failed to create pin, server error')
          }
        }
      } catch (err) {
        console.log(err)
        return response(res, 500, false, 'Failed to create pin, server error')
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to create pin, server error')
  }
}

exports.changePin = async (req, res) => {
  try {
    const results = await userModel.findByCondition({
      id: req.params.id
    })
    if (results.length < 1) {
      return response(res, 400, false, 'Failed to change pin, unknown user id')
    } else {
      try {
        const pin = await bcrypt.hash(req.body.pin, 8)
        const results = await userModel.create(req.params.id, pin)
        if (!results) {
          return response(res, 400, false, 'Failed to change pin')
        } else {
          return response(res, 200, true, 'Success to change pin')
        }
      } catch (err) {
        console.log(err)
        return response(res, 500, false, 'Failed to change pin, server error')
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to change pin, server error')
  }
}

exports.register = async (req, res) => {
  const { username, email, password } = req.body
  const isUserNameExists = await userModel.getUsersByConditionAsync({ username })
  const isEmailExists = await userModel.getUsersByConditionAsync({ email })
  if (isUserNameExists.length < 1 && isEmailExists.length < 1) {
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(password, salt)
    const createUser = await userModel.createUserAsync({ verified: 0, username, email, password: encryptedPassword })
    if (createUser.insertId > 0) {
      const { insertId } = createUser
      const token = jwt.sign({ insertId }, SECRET)
      mailer(email, 'Link activate Walletchip', `<div> <p>'${REACT_APP_URL}/auth/create-pin/${token}'</p> </div>`)
      return response(res, 200, true, 'Register Success!')
    } else {
      return response(res, 400, false, 'Register Failed')
    }
  } else {
    if (isUserNameExists.length > 0 && isEmailExists.length > 0) {
      return response(res, 400, false, 'Register Failed, username and email already exists')
    } else if (isUserNameExists.length > 0) {
      return response(res, 400, false, 'Register Failed, username already exists')
    } else {
      return response(res, 400, false, 'Register Failed, email already exists')
    }
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const existingUser = await userModel.getUsersByConditionAsync({ email })
  if (existingUser.length > 0) {
    const compare = await bcrypt.compare(password, existingUser[0].password)
    if (compare) {
      const { id, verified } = existingUser[0]
      if (!verified) {
        return response(res, 400, false, 'You must verified your account first')
      }
      const token = jwt.sign({ id }, SECRET)
      console.log(verified)
      return response(res, 200, true, 'Login successfully', { token })
    }
  }
  return res.status(401).json({
    success: false,
    message: 'Wrong email or password'
  })
}

exports.getResetPasswordLink = async (req, res) => {
  const {
    email
  } = req.body

  const {
    SECRET
  } = process.env

  try {
    const results = await userModel.findByCondition({
      email
    })

    if (results.length < 1) {
      return response(res, 400, false, 'Unknown email')
    } else {
      const hash = jwt.sign({
        id: results[0].id,
        email
      }, SECRET)
      mailer(
        email,
        'Forgot Password',
        `<div>
          <h3>Please click link below to reset your password</h3>
          <a href="${process.env.REACT_APP_URL}/auth/forgot/reset-password/${hash}">Click Me</a>
        </div>`
      )

      return response(res, 200, true, 'Please check your email for reset your password')
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to send reset password link, server error')
  }
}

exports.resetPassword = async (req, res) => {
  const {
    email
  } = req.body

  const {
    id
  } = req.params

  try {
    const password = await bcrypt.hash(req.body.password, 8)
    const results = await userModel.updateByCondition({ password }, { id, email })

    if (!results) {
      return response(res, 400, false, 'Failed to reset password, unknown email or id')
    } else {
      return response(res, 200, true, 'Successfully to reset password')
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to reset password, server error')
  }
}

exports.activateAccount = async (req, res) => {
  const {
    id
  } = req.params

  try {
    const result = await userModel.findByCondition({ id })
    if (!result) {
      return response(res, 400, false, 'Failed to identify ID')
    } else {
      try {
        const updateVerified = await userModel.updateByCondition({ verified: true }, { id })
        if (!updateVerified) {
          return response(res, 400, false, 'Failed to activate account')
        } else {
          return response(res, 200, true, 'Successfuly to activate account !')
        }
      } catch (error) {
        console.log(error)
        return response(res, 500, false, 'Failed to activate account, server error')
      }
    }
  } catch (error) {
    console.log(error)
    return response(res, 500, false, 'Failed to identify ID, server error')
  }
}

exports.comparePin = async (req, res) => {
  const { pin, id } = req.body

  try {
    const isExist = await userModel.findByCondition({ id })

    if (isExist.length < 1) {
      return response(res, 400, false, 'Failed to compare pin, unknown id')
    } else {
      if (!(await bcrypt.compare(pin, isExist[0].pin))) {
        return response(res, 400, false, 'Wrong pin', {
          isTrue: false
        })
      } else {
        return response(res, 200, true, 'True pin', {
          isTrue: true
        })
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to compare pin')
  }
}
