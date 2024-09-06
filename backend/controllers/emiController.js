import EmiRecord from "../models/EmiRecord.js";

// Calculate EMI and month-wise breakdown
export const calculateEmi = async (req, res) => {
  const { loan_amount, interest_rate, loan_tenure_months, prepayment_amount } =
    req.body;

  if (!loan_amount || !interest_rate || !loan_tenure_months) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const R = interest_rate / 12 / 100;
  const N = loan_tenure_months;

  const emi = (loan_amount * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  const remaining_balance = loan_amount;

  await EmiRecord.create({
    loan_amount,
    interest_rate,
    loan_tenure_months,
    emi,
    prepayment_amount,
    remaining_balance,
  });

  const monthWisePayments = [];
  let currentBalance = remaining_balance;

  for (let month = 1; month <= N; month++) {
    const interestPaid = currentBalance * R;
    const principalPaid = emi - interestPaid;
    const newRemainingBalance =
      currentBalance - principalPaid - (prepayment_amount || 0);

    monthWisePayments.push({
      month,
      emiPaid: emi,
      interestPaid: interestPaid.toFixed(2),
      principalPaid: principalPaid.toFixed(2),
      prepayment: prepayment_amount || 0,
      remainingBalance: newRemainingBalance.toFixed(2),
    });

    currentBalance = newRemainingBalance;
  }

  res.json({
    loanAmount: loan_amount,
    interestRate: interest_rate,
    loanTenureMonths: loan_tenure_months,
    emi: emi.toFixed(2),
    prepayment: prepayment_amount || 0,
    monthWisePayments,
  });
};

// Fetch all EMI records
export const getAllEmis = async (req, res) => {
  const records = await EmiRecord.findAll();
  res.json(records);
};

// Fetch a specific EMI record
export const getEmiById = async (req, res) => {
  const record = await EmiRecord.findByPk(req.params.id);
  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }
  res.json(record);
};
