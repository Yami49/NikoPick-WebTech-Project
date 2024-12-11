module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    products: {
      collection: "product",
      via: "category",
    },
  },
};
