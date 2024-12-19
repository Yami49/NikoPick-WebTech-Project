const { primaryKey } = require("./User");

module.exports = {
  primaryKey: "orderId",
  attributes: {
    orderId: {
      type: "number",
      autoIncrement: true,
      unique: true,
    },
    date: { type: "ref", columnType: "datetime" },
    status: { type: "string" },

    // Beziehungen
    user: {
      model: "user",
      required: true,
    },
    orderItems: {
      collection: "orderitem",
      via: "order",
    },
  },
};
