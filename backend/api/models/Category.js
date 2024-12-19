module.exports = {
  attributes: {
    categoryId: {
      type: "number",
      unique: true,
    },
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
