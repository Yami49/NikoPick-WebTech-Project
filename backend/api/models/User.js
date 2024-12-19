module.exports = {
  attributes: {
    userId: { type: "number", unique: true },
    username: { type: "string", unique: true },
    email: { type: "string", unique: true },
    password: { type: "string" },
    role: { type: "string" },
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

  /*/ Hash das Passwort vor dem Speichern
  beforeCreate: async function (user, proceed) {
    const bcrypt = require('bcrypt');
    user.password = await bcrypt.hash(user.password, 10);
    return proceed();
  },*/
};
