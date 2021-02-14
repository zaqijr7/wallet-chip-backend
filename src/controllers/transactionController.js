// ==== import module
const response = require('../helpers/response')
const bcrypt = require('bcryptjs')

// ===== import models
const transactionsModel = require('../models/Transaction')
const usersModel = require('../models/User')

const {
  FILE_URL
} = process.env

exports.getUserTransactionHistory = async (req, res) => {
  const userID = req.userData.id
  console.log(userID)

  try {
    const results = await transactionsModel.getUserTransactionHistory(userID)
    if (results.length < 1) {
      return response(res, 200, true, 'User has no transactional history')
    } else {
      const modified = results.map(data => ({
        user: data.user,
        another_user: data.another_user,
        did_user_transfer: data.did_user_transfer,
        amount: data.amount,
        picture: `${FILE_URL}/${data.picture}`
      }))
      return response(res, 200, true, 'User transactionals history list', modified)
    }
  } catch (err) {
    response(res, 400, false, 'Failed to get user transactional history', [])
    console.log(err)
    throw new Error(err)
  }
}

exports.getUserTransactionSummary = async (req, res) => {
  const userID = req.userData.id
  console.log(userID)
  try {
    const results = await transactionsModel.getUserTransactionSummary(userID)

    if (results.length < 1) {
      return response(res, 200, true, 'User has no transactional history')
    } else {
      return response(res, 200, true, 'User transactionals summary list', results)
    }
  } catch (err) {
    response(res, 400, false, 'Failed to get user transactional history')
    throw new Error(err)
  }
}

exports.createTransfer = async (req, res) => {
  const {
    receiverId,
    transactionDate,
    note,
    amount,
    pin
  } = req.body

  const {
    id: userId
  } = req.userData

  try {
    const pinHashed = await usersModel.findByCondition({
      id: userId
    })

    if (!(await bcrypt.compare(pin, pinHashed[0].pin))) {
      return response(res, 400, false, 'Wrong pin')
    } else {
      try {
        const pastBalanceSender = await usersModel.findByCondition({
          id: userId
        })

        const pastBalanceReceiver = await usersModel.findByCondition({
          id: receiverId
        })

        if (!pastBalanceSender || !pastBalanceReceiver) {
          return response(res, 400, false, 'Failed to get past balance, unkown id')
        } else {
          const balanceMin = Number(pastBalanceSender[0].balance) - Number(amount)
          const balanceMax = Number(pastBalanceReceiver[0].balance) + Number(amount)

          if (Number(pastBalanceSender[0].balance) < 1) {
            return response(res, 400, false, 'No balance')
          } else if (Number(pastBalanceSender[0].balance) < Number(amount)) {
            return response(res, 400, false, 'Insufficient balance')
          }

          try {
            const transferSender = await usersModel.updateByCondition({ balance: balanceMin }, {
              id: userId
            })
            const transferReceiver = await usersModel.updateByCondition({ balance: balanceMax }, {
              id: receiverId
            })

            if (!transferReceiver || !transferSender) {
              return response(res, 400, false, 'Failed to transfer')
            } else {
              try {
                const data = [
                  {
                    receiver_id: receiverId,
                    transactionDate,
                    note,
                    amount,
                    user_id: userId,
                    is_transfer: 1
                  },
                  {
                    receiver_id: receiverId,
                    transactionDate,
                    note,
                    amount,
                    user_id: userId,
                    is_transfer: 0
                  }
                ]
                const insertTransaction = await transactionsModel.create(data)

                if (!insertTransaction) {
                  return response(res, 400, false, 'Failed to transfer')
                } else {
                  try {
                    const receiverData = await usersModel.findByCondition({
                      id: receiverId
                    })
                    return response(res, 200, false, 'Transfer Success', {
                      id: insertTransaction,
                      ...req.body,
                      phone: receiverData[0].phone,
                      firstName: receiverData[0].first_name,
                      lastName: receiverData[0].last_name,
                      picture: `${process.env.APP_URL}/uploads/${receiverData[0].picture}`,
                      pin: undefined
                    })
                  } catch (err) {
                    console.log(err)
                    return response(res, 500, false, 'Failed to get sender data, server errror')
                  }
                }
              } catch (err) {
                console.log(err)
                return response(res, 500, false, 'Failed to transfer, server errror')
              }
            }
          } catch (err) {
            console.log(err)
            return response(res, 500, false, 'Failed to transfer, server errror')
          }
        }
      } catch (err) {
        console.log(err)
        return response(res, 500, false, 'Failed to get past balance, server errror')
      }
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Failed to verify pin, server error')
  }
}
