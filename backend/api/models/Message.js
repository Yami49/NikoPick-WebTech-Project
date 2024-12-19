module.exports = {
  attributes: {
    messageId: {
      type: "number",
      unique: true,
      autoIncrement: true,
    },
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
    createdAt: {
      type: "ref",
      columnType: "datetime",
      autoCreatedAt: true,
    },
    updatedAt: {
      type: "ref",
      columnType: "datetime",
      autoUpdatedAt: true,
    },
  },
};
