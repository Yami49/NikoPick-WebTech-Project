module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      isEmail: true,
    },
    phone: {
      type: "string",
      allowNull: true, // Telefonnummer ist optional
    },
    message: {
      type: "string",
      required: true,
    },
  },
};
