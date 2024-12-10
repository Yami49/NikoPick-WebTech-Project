const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Benutzer anhand der E-Mail finden
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Benutzer nicht gefunden" });
      }

      // Passwort überprüfen
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Ungültiges Passwort" });
      }

      // JWT-Token erstellen
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
