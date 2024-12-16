module.exports = {
  // Nachricht speichern
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
  findAll: async function (req, res) {
    try {
      const messages = await Message.find();
      return res.json(messages);
    } catch (error) {
      return res.serverError(error);
    }
  },

  delete: async function (req, res) {
    try {
      const { id } = req.body; // Die ID aus dem Request-Body extrahieren

      if (!id) {
        return res.badRequest({
          error: "ID ist erforderlich, um die Nachricht zu löschen.",
        });
      }

      const deletedMessage = await Message.destroyOne({ id });

      if (!deletedMessage) {
        return res.notFound({
          error: "Nachricht mit der angegebenen ID wurde nicht gefunden.",
        });
      }

      return res.json({
        message: "Nachricht erfolgreich gelöscht.",
        deletedMessage,
      });
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Löschen der Nachricht.",
        details: error,
      });
    }
  },
};
