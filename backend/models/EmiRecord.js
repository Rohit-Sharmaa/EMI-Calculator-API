import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EmiRecord = sequelize.define("EmiRecord", {
  loan_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  interest_rate: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  loan_tenure_months: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  emi: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  prepayment_amount: {
    type: DataTypes.DECIMAL,
    defaultValue: null,
  },
  remaining_balance: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

export default EmiRecord;
