module.exports = {
  // Nachricht erstellen
  create: async function (req, res) {
    try {
      const { name, email, phone, message } = req.body;
      const newMessage = await Message.create({
        name,
        email,
        phone,
        message,
      }).fetch();
      return res.json(newMessage);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Erstellen der Nachricht.",
        details: error,
      });
    }
  },

  // Alle Nachrichten anzeigen
  find: async function (req, res) {
    try {
      const messages = await Message.find();
      return res.json(messages);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden der Nachrichten.",
        details: error,
      });
    }
  },

  // Einzelne Nachricht anzeigen
  findOne: async function (req, res) {
    try {
      const message = await Message.findOne({
        messageId: req.params.messageId,
      });
      if (!message) return res.notFound({ error: "Nachricht nicht gefunden." });
      return res.json(message);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden der Nachricht.",
        details: error,
      });
    }
  },

  // Nachricht löschen
  delete: async function (req, res) {
    try {
      await Message.destroyOne({ messageId: req.params.messageId });
      return res.json({ message: "Nachricht erfolgreich gelöscht." });
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Löschen der Nachricht.",
        details: error,
      });
    }
  },
};
