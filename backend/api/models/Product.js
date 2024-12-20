const { primaryKey } = require("./User");

module.exports = {
  primaryKey: "productId",
  attributes: {
    productId: {
      type: "number",
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    price: {
      type: "number",
    },
    category: {
      model: "category",
    },
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
