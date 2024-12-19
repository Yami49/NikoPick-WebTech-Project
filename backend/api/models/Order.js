module.exports = {
  attributes: {
    orderId: {
      type: "number",
      unique: true,
      autoIncrement: true,
    },
    date: {
      type: "ref",
      columnType: "datetime",
      autoCreatedAt: true,
    },
    status: {
      type: "string",
      isIn: ["pending", "shipped", "delivered", "cancelled"],
      defaultsTo: "pending",
    },
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
