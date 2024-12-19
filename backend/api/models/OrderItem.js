module.exports = {
  attributes: {
    orderItemId: {
      type: "number",
      unique: true,
      autoIncrement: true,
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
