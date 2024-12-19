module.exports = {
  attributes: {
    productId: { type: "number", unique: true },
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    category: { model: "category" },
    category: {
      model: "category",
    }, // 1:n Beziehung zu Category
    reviews: {
      collection: "review",
      via: "product",
    },
    orderItems: {
      collection: "orderitem",
      via: "product",
    },
  },
};
