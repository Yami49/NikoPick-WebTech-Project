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
