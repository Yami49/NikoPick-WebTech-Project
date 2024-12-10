module.exports = {
  async testConnection(req, res) {
    try {
      const users = await User.find();
      return res.json({
        message: "Datenbankverbindung erfolgreich!",
        users,
      });
    } catch (error) {
      return res.serverError({
        message: "Datenbankverbindung fehlgeschlagen",
        error,
      });
    }
  },
  // Methode zum Löschen eines Benutzers
  deleteUser: async function (req, res) {
    try {
      const userId = req.params.id;

      // Überprüfen, ob der Benutzer existiert
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ error: "Benutzer nicht gefunden" });
      }

      // Benutzer löschen
      await User.destroyOne({ id: userId });

      return res.json({ message: "Benutzer erfolgreich gelöscht" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Fehler beim Löschen des Benutzers" });
    }
  },
};
