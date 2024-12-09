module.exports = {
  attributes: {
    name: { type: "string", required: true },
    products: { collection: "product", via: "category" },
  },
};
