CREATE TABLE emi_records (
    id SERIAL PRIMARY KEY,
    loan_amount DECIMAL NOT NULL,
    interest_rate DECIMAL NOT NULL,
    loan_tenure_months INTEGER NOT NULL,
    emi DECIMAL NOT NULL,
    prepayment_amount DECIMAL DEFAULT NULL,
    remaining_balance DECIMAL NOT NULL
);