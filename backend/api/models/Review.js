module.exports = {
  primaryKey: "reviewId",
  attributes: {
    reviewId: {
      type: "number",
      autoIncrement: true,
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
