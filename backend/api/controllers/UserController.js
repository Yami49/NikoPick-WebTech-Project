module.exports = {
  // Benutzer erstellen
  create: async function (req, res) {
    try {
      const { userId, name, email, password, typ } = req.body;
      const user = await User.create({
        userId,
        name,
        email,
        password,
        typ,
      }).fetch();
      return res.json(user);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Erstellen des Benutzers.",
        details: error,
      });
    }
  },

  // Alle Benutzer anzeigen
  find: async function (req, res) {
    try {
      const users = await User.find().populate("orders").populate("reviews");
      return res.json(users);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden der Benutzerliste.",
        details: error,
      });
    }
  },

  // Einzelnen Benutzer anzeigen
  findOne: async function (req, res) {
    try {
      const user = await User.findOne({ userId: req.params.userId })
        .populate("orders")
        .populate("reviews");
      if (!user) return res.notFound({ error: "Benutzer nicht gefunden." });
      return res.json(user);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden des Benutzers.",
        details: error,
      });
    }
  },

  // Benutzer aktualisieren
  update: async function (req, res) {
    try {
      const { name, email, typ } = req.body;
      const updatedUser = await User.updateOne({
        userId: req.params.userId,
      }).set({ name, email, typ });
      if (!updatedUser)
        return res.notFound({ error: "Benutzer nicht gefunden." });
      return res.json(updatedUser);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Aktualisieren des Benutzers.",
        details: error,
      });
    }
  },

  // Benutzer löschen
  delete: async function (req, res) {
    try {
      await User.destroyOne({ userId: req.params.userId });
      return res.json({ message: "Benutzer erfolgreich gelöscht." });
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Löschen des Benutzers.",
        details: error,
      });
    }
  },
};
