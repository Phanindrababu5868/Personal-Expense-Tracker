# Personal Expense Tracker API

The Personal Expense Tracker API is a RESTful API that allows users to manage their financial records by tracking income and expenses. Users can add transactions, retrieve them, and get summaries of their financial activities.

## Table of Contents

- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)


## Technologies

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Other Tools**: Postman for API testing

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (either locally installed or a cloud instance)
- Postman (for testing the API)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Phanindrababu5868/Personal-Expense-Tracker
   cd personal-expense-tracker-api
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. Set Up Environment Variables Create a `.env` file in the root directory and add the following:
  ```bash
  MONGODB_URI=mongodb_url
JWT_SECRET=your_jwt_secret
PORT=5000
  ```
4. Start the Server
  ```bash
  node app.js
  ```

## API Endpoints

you can find more details and examples in this [Documention](https://documenter.getpostman.com/view/22472618/2sAXxY5UeK)

### User Authentication
- `POST /api/register`: Register a new user
```bash
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password@1234"

}
```
- `POST /api/login`: Login and get JWT token
``` bash
{

  "email": "john@example.com",
  "password": "password@1234"

}
```
- `GET /api/profile`: Get user profile (requires JWT)
(requires JWT)

### Transactions
#### Base url
```
http://localhost:5000/api/transactions

```
#### Endpoints

1.  Add a Transaction
- POST /transactions
- Request Body:
```
{
  "type": "income", // or "expense"
  "category": "categoryId",
  "amount": 1500,
  "description": "Salary for October"
}
```
2.  Get All Transactions
- GET /transactions
3.  Get Transaction by ID
- GET /transactions/
4. Update a Transaction
- PUT /transactions/
Request Body:
```
{
  "amount": 2000,
  "description": "Updated salary for October"
}
```
5. Delete a Transaction
- DELETE /transactions/
6. Get Transaction Summary
- GET /transactions/summary
- Query Parameters:
  category (optional)




you can find more details and examples in this [Documention](https://documenter.getpostman.com/view/22472618/2sAXxY5UeK) 
