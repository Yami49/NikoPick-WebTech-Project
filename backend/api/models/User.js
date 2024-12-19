module.exports = {
  attributes: {
    userId: {
      type: "number",
      unique: true,
      autoIncrement: true,
    },
    username: {
      type: "string",
      required: true,
      unique: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      isIn: ["user", "admin"],
      defaultsTo: "user",
    },
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
