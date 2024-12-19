module.exports = {
  primaryKey: "categoryId", // Definiere categoryId als primären Schlüssel
  attributes: {
    categoryId: {
      type: "number",
      autoIncrement: true,
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
