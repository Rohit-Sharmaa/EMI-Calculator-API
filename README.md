# EMI Calculator API

## Overview

This project provides a RESTful API for calculating Equated Monthly Installments (EMI) with an option for prepayments. The API is built using Node.js, Express, and PostgreSQL.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later)
- **PostgreSQL** (v10 or later)
- **npm** (comes with Node.js)

## Setup Instructions

### Step 1: Clone the Repository

### Step 2: Create PostgreSQL Database

1. Open your PostgreSQL client (like pgAdmin or psql).
2. Create a new database:

`CREATE DATABASE your_database_name;`

### Step 3: Run the SQL Migration Script

1. Open the SQL script migrations/setup.sql.
2. Run the script to create the necessary table:

```
\i migrations/setup.sql

```

### Step 4: Configure Environment Variables

1. Create a .env file in the root directory.
2. Add your database credentials:

.env

```
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
PORT=3000
```

### Step 5: Install Dependencies

```
npm install
```

```
npm start
```

The server will start running on http://localhost:3000.

### API Endpoints

1. Calculate EMI and get month-wise breakdown.

Method - POST

```
/api/calculate-emi
```

-Request Body:

```
{
    "loan_amount": 500000,
    "interest_rate": 8.5,
    "loan_tenure_months": 60,
    "prepayment_amount": 20000
}
```

Response:

```{
    "loanAmount": 500000,
    "interestRate": 8.5,
    "loanTenureMonths": 60,
    "emi": 10234.65,
    "prepayment": 20000,
    "monthWisePayments": [
        {
            "month": 1,
            "emiPaid": 10234.65,
            "interestPaid": 3541.67,
            "principalPaid": 6692.98,
            "prepayment": 20000,
            "remainingBalance": 473307.02
        },
        // Additional months...
    ]
}
```

2. Get all EMI records.

Method - GET

```
/api/emis
```

3. Get a specific EMI record by ID.

Method - GET

```
 /api/emi/:id:
```
