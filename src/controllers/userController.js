// ==== import module
const response = require('../helpers/response')
const bcrypt = require('bcryptjs')
const deleteFile = require('../helpers/deleteFile')

// ===== import models
const userModel = require('../models/User')

const {
  FILE_URL
} = process.env

exports.getUserDetails = async (req, res) => {
  const userID = req.userData.id
  try {
    const results = await userModel.getUsersByIdAsync(userID)

    if (results.length < 1) {
      return response(res, 400, false, 'Unknown user')
    } else {
      const modified = { ...results[0], picture: `${FILE_URL}/${results[0].picture}` }
      return response(res, 200, true, 'User details', modified)
    }
  } catch (err) {
    response(res, 400, false, 'Failed to get user details')
    throw new Error(err)
  }
}

exports.getReceiverDetails = async (req, res) => {
  const {
    id
  } = req.params

  try {
    const results = await userModel.getReceiverDetails(id)

    if (results.length < 1) {
      return response(res, 400, false, 'Unknown user')
    } else {
      return response(res, 200, true, 'Receiver details', results[0])
    }
  } catch (err) {
    response(res, 400, false, 'Failed to get receiver details')
    throw new Error(err)
  }
}

exports.updateUserDetails = async (req, res) => {
  const userID = req.userData.id
  const data = req.body
  try {
    const results = await userModel.updateUserDetails(userID, data)
    if (results.length < 1) {
      return response(res, 400, false, 'Unknown user')
    } else {
      return response(res, 200, true, 'User profile successfully updated', { ...data })
    }
  } catch (err) {
    response(res, 400, false, 'Failed to update user profile')
    throw new Error(err)
  }
}

exports.getAllUsers = async (req, res) => {
  const {
    page = 1,
    search = '',
    sort = 'ASC',
    limit = 4,
    by = 'username'
  } = req.query

  try {
    const startData = (limit * page) - limit
    const totalData = await userModel.getUserCount(req.userData.id)
    const totalDataSearch = await userModel.getUserCountSearch({
      keyword: search,
      sort,
      offset: startData,
      limit,
      by,
      id: req.userData.id
    })
    const totalPages = Math.ceil(totalData / limit)

    try {
      const results = await userModel.findAll({
        keyword: search,
        sort,
        offset: startData,
        limit,
        by,
        id: req.userData.id
      })

      const modifiedTotalData = req.query.search ? totalDataSearch : totalData
      const modifiedTotalPage = req.query.search ? Math.ceil(modifiedTotalData / limit) : totalPages

      if (results.length < 1) {
        return response(res, 200, true, 'Data not available', results, modifiedTotalData, modifiedTotalPage, page, req)
      } else {
        const modifiedResults = results.map(item => ({
          ...item,
          picture: FILE_URL.concat(`/${item.picture}`)
        }))
        return response(res, 200, true, 'Successfully to get all users', modifiedResults, modifiedTotalData, modifiedTotalPage, page, req)
      }
    } catch (err) {
      console.log(err)
      return response(res, 500, false, 'Failed to get user list, server error')
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to get user count, server error')
  }
}

exports.resetPassword = async (req, res) => {
  const {
    currentPassword,
    newPassword
  } = req.body

  const {
    id
  } = req.params

  try {
    const isExists = await userModel.findByCondition({ id })

    if (isExists.length < 1) {
      return response(res, 400, false, 'Failed to reset password, unknown id')
    } else {
      if (!(await bcrypt.compare(currentPassword, isExists[0].password))) {
        return response(res, 400, false, 'Wrong password')
      } else {
        try {
          const password = await bcrypt.hash(newPassword, 8)
          const results = await userModel.updateByCondition({ password }, { id })

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
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to reset password, server error')
  }
}

exports.editProfile = async (req, res) => {
  const {
    id
  } = req.params

  const {
    firstName,
    lastName,
    email,
    phone
  } = req.body

  try {
    const isUserExists = await userModel.findByCondition({ id })

    if (isUserExists.length < 1) {
      return response(res, 400, false, 'Failed to edit profile, unknown user id')
    } else {
      try {
        const updateProfile = await userModel.updateByCondition({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone
        }, { id })

        if (!updateProfile) {
          return response(res, 400, false, 'Failed to edit profile')
        } else {
          return response(res, 200, true, 'Successfully to edit profile', {
            ...req.body
          })
        }
      } catch (err) {
        console.log(err)
        return response(res, 500, false, 'Failed to edit profile, server error')
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to edit profile, server error')
  }
}

exports.upload = async (req, res) => {
  const {
    file: {
      filename: picture
    }
  } = req

  const { id } = req.params

  try {
    const isExists = await userModel.findByCondition({ id })

    if (isExists.length < 1) {
      deleteFile(picture)
      return response(res, 400, false, 'Failed to upload file, unknown user id')
    } else {
      try {
        const updatePicture = await userModel.updateByCondition({ picture }, { id })

        if (!updatePicture) {
          deleteFile(picture)
          return response(res, 400, false, 'Failed to upload file, unknown user id')
        } else {
          return response(res, 200, true, 'Success to upload file')
        }
      } catch (err) {
        deleteFile(picture)
        console.log(err)
        return response(res, 500, false, 'Failed to upload file, server error')
      }
    }
  } catch (err) {
    deleteFile(picture)
    console.log(err)
    return response(res, 500, false, 'Failed to upload file, server error')
  }
}
