const { primaryKey } = require("./User");

module.exports = {
  primaryKey: "transactionId",
  attributes: {
    transactionId: {
      type: "number",
      autoIncrement: true,
      unique: true,
    },
    customerName: {
      type: "string",
      required: true,
    },
    transactionType: {
      type: "string",
      required: true,
      isIn: ["Kauf", "Verkauf", "Rückerstattung"],
    },
    amount: {
      type: "number",
      required: true,
      min: 0,
    },
    description: {
      type: "string",
    },
    date: {
      type: "string",
      columnType: "datetime",
      defaultsTo: new Date().toISOString(),
    },
  },
};
