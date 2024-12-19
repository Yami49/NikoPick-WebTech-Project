module.exports = {
  attributes: {
    productId: {
      type: "number",
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
    },
    description: {
      type: "string",
    },
    price: {
      type: "number",
      required: true,
    },
    rating: {
      type: "number",
      defaultsTo: 0,
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
