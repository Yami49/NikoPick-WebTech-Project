module.exports = {
  attributes: {
    name: { type: "string", required: true },
    description: { type: "string" },
    price: { type: "number", required: true },
    category: { model: "category" }, // 1:n Beziehung zu Category
  },
};
