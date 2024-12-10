module.exports = {
  async send(req, res) {
    try {
      const { name, email, phone, message } = req.body;

      // Überprüfen, ob alle Felder vorhanden sind
      if (!name || !email || !phone || !message) {
        return res
          .status(400)
          .json({ error: "Alle Felder sind erforderlich." });
      }

      // Nachricht speichern
      const newMessage = await Message.create({
        name,
        email,
        phone,
        message,
      }).fetch();

      return res
        .status(201)
        .json({
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
};
