module.exports = {
  // Registrierungsmethode
  register: async function (req, res) {
    try {
      const { username, email, password, role } = req.body;

      // Benutzer erstellen (Passwort im Klartext speichern)
      const newUser = await User.create({
        username,
        email,
        password, // Passwort wird im Klartext gespeichert
        role: role || "user",
      }).fetch();

      return res.json({
        message: "Benutzer erfolgreich registriert",
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Fehler bei der Registrierung" });
    }
  },

  // Anmeldemethode
  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Benutzer anhand der E-Mail finden
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Benutzer nicht gefunden" });
      }

      // Passwort im Klartext vergleichen
      if (user.password !== password) {
        return res.status(401).json({ error: "Ungültiges Passwort" });
      }

      // JWT-Token erstellen (optional)
      const jwt = require("jsonwebtoken");
      const token = jwt.sign({ id: user.id, role: user.role }, "secretKey", {
        expiresIn: "1h",
      });

      return res.json({
        message: "Anmeldung erfolgreich",
        token,
        role: user.role,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }
  },
};
