const { primaryKey } = require("./User");

module.exports = {
  primaryKey: "orderItemId",
  attributes: {
    orderItemId: {
      type: "number",
      autoIncrement: true,
      unique: true,
    },
    quantity: {
      type: "number",
      required: true,
    },
    totalPrice: {
      type: "number",
      required: true,
    },
    unitPrice: {
      type: "number",
      required: true,
    },
    // Beziehungen
    order: {
      model: "order",
      required: true,
    },
    product: {
      model: "product",
      required: true,
    },
  },
};
