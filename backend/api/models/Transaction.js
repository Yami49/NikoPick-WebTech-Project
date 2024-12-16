module.exports = {
  attributes: {
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
