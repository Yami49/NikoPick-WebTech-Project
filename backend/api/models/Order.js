module.exports = {
  attributes: {
    orderId: {
      type: "number",
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
