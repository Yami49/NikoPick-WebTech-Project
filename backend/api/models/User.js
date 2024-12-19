// api/models/User.js
module.exports = {
  primaryKey: "userId", // Definiere userId als primären Schlüssel
  attributes: {
    userId: { type: "number", autoIncrement: true },
    username: { type: "string", unique: true, required: true },
    email: { type: "string", unique: true, required: true },
    password: { type: "string", required: true },
    role: { type: "string", defaultsTo: "user" },

    // Beziehungen
    orders: {
      collection: "order",
      via: "user",
    },
    reviews: {
      collection: "review",
      via: "user",
    },
  },
};
