// api/controllers/UserController.js
module.exports = {
  // Benutzer erstellen
  create: async function (req, res) {
    try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || "user",
      }).fetch();
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Alle Benutzer abrufen
  find: async function (req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Einen Benutzer anhand der userId abrufen
  findOne: async function (req, res) {
    try {
      const user = await User.findOne({ userId: req.params.userId });
      if (!user) {
        return res.status(404).json({ error: "Benutzer nicht gefunden" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Benutzer aktualisieren
  update: async function (req, res) {
    try {
      const updatedUser = await User.updateOne({
        userId: req.params.userId,
      }).set({
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
      });
      if (!updatedUser) {
        return res.status(404).json({ error: "Benutzer nicht gefunden" });
      }
      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Benutzer löschen
  deleteUser: async function (req, res) {
    try {
      const deletedUser = await User.destroyOne({ userId: req.params.userId });
      if (!deletedUser) {
        return res.status(404).json({ error: "Benutzer nicht gefunden" });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Testverbindung für die API
  testConnection: async function (req, res) {
    return res.status(200).json({ message: "API-Verbindung erfolgreich!" });
  },
};
