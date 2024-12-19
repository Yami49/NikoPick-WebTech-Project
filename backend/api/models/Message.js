module.exports = {
  attributes: {
    messageId: {
      type: "number",
      unique: true,
    }, // Eindeutig, aber kein AUTO_INCREMENT
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    message: {
      type: "string",
    },
  },
};
