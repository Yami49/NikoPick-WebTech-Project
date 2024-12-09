module.exports = {
  async testConnection(req, res) {
    try {
      const users = await User.find();
      return res.json({ message: "Datenbankverbindung erfolgreich!", users });
    } catch (error) {
      return res.serverError({
        message: "Datenbankverbindung fehlgeschlagen",
        error,
      });
    }
  },
};
