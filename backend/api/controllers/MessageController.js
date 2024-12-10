module.exports = {
  async getAll(req, res) {
    try {
      const messages = await Message.find().sort([{ createdAt: "DESC" }]);
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Fehler beim Abrufen der Nachrichten:", error);
      return res
        .status(500)
        .json({ error: "Fehler beim Abrufen der Nachrichten." });
    }
  },

  // Methode zum Senden einer Nachricht
  async send(req, res) {
    try {
      const { name, email, phone, message } = req.body;

      if (!name || !email || !phone || !message) {
        return res
          .status(400)
          .json({ error: "Alle Felder sind erforderlich." });
      }

      const newMessage = await Message.create({
        name,
        email,
        phone,
        message,
      }).fetch();

      return res.status(201).json({
        message: "Nachricht erfolgreich gespeichert!",
        data: newMessage,
      });
    } catch (error) {
      console.error("Fehler beim Speichern der Nachricht:", error);
      return res
        .status(500)
        .json({ error: "Fehler beim Speichern der Nachricht." });
    }
  },

  // Nachricht löschen
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Überprüfen, ob die ID vorhanden ist
      if (!id) {
        return res.status(400).json({ error: "ID ist erforderlich." });
      }

      // Nachricht löschen
      const deletedMessage = await Message.destroyOne({ id });

      if (!deletedMessage) {
        return res.status(404).json({ error: "Nachricht nicht gefunden." });
      }

      return res
        .status(200)
        .json({ message: "Nachricht erfolgreich gelöscht!" });
    } catch (error) {
      console.error("Fehler beim Löschen der Nachricht:", error);
      return res
        .status(500)
        .json({ error: "Fehler beim Löschen der Nachricht." });
    }
  },
};
