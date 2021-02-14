# Walletchip Web Service With Express Js & MySQL
This is backend app written in Javascript Stack. Backend app theme is "Walletchip"

## Requirements
- NodeJS v14 LTS
- MySQL

## How To Run This App

- Make sure you had clone this repo
- Copy environment from `.env.example` to `.env`
- Configure your `.env` file according to your mysql credentials
- Open your terminal in this project and run 
  ```
  npm i
  ```
- And then
  ```
  npm start
  ```

## API SPECS
- POST `/api/auth/register` Route for register new user (body -> username, email, password)
- POST `/api/auth/login` Route for login to exiting user (body -> email, password)
- PATCH `/api/auth/verified/:userId` Route for verified user account
- POST `/api/auth/password` Route for send email to activated user account (body -> email)
- PATCH `/api/auth/password/:userId` Route for reset user password (body -> email, password)
- POST `/api/auth/pin?id=userId` Route for create user pin (body -> pin)
- PATCH `/api/auth/pin/:id` Route for change user pin (body -> pin)
- GET `/api/dashboard/profile` Route for get user by id on home page
- GET `/api/transaction-history-week` Route for get user this week transactional history by id
- GET `/api/transaction-history-month` Route for get user past this month transactional history by id
- PATCH `/api/user/picture/:userId` Route for upload user picture (body -> picture)
- GET `/api/user?sort=ASC&by=id&page=3` Route for get receiver account for transfer balance
- POST `/api/transfer` Route for transfer balance (body -> amount, transactionDate, note, pin & receiverId)
- PATCH `/api/user/:userId` Route for edit user profile (body -> firstName, lastName, email, phone)
- PATCH `/api/user/password/:userId` Route for change user password (body -> currentPassword, newPassword)
- POST `/api/auth/currentPin` Route for compare pin (body -> id, pin)