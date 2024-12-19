module.exports = {
  attributes: {
    reviewId: {
      type: "number",
      unique: true,
    },
    rating: {
      type: "number",
      required: true,
    },
    comment: {
      type: "string",
    },
    // Beziehungen
    user: {
      model: "user",
      required: true,
    },
    product: {
      model: "product",
      required: true,
    },
  },
};
