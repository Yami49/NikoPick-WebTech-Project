const { primaryKey } = require("./User");

module.exports = {
  primaryKey: "messageId",
  attributes: {
    messageId: {
      type: "number",
      autoIncrement: true,
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
