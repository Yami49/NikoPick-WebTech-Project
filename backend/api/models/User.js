module.exports = {
  attributes: {
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
  },

  /*/ Hash das Passwort vor dem Speichern
  beforeCreate: async function (user, proceed) {
    const bcrypt = require('bcrypt');
    user.password = await bcrypt.hash(user.password, 10);
    return proceed();
  },*/
};
