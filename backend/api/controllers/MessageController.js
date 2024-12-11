module.exports = {
  // Nachricht speichern
  create: async function (req, res) {
    try {
      const { name, email, message } = req.body;
      const newMessage = await Message.create({ name, email, message }).fetch();
      return res.json(newMessage);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Alle Nachrichten anzeigen
  findAll: async function (req, res) {
    try {
      const messages = await Message.find();
      return res.json(messages);
    } catch (error) {
      return res.serverError(error);
    }
  },
};
