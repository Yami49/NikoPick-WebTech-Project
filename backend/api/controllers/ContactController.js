const nodemailer = require("nodemailer");

module.exports = {
  async send(req, res) {
    try {
      const { name, email, phone, message } = req.body;

      // NodeMailer-Transporter konfigurieren
      let transporter = nodemailer.createTransport({
        service: "gmail", // Alternativ z.B. SMTP-Server deines Hosting-Anbieters
        auth: {
          user: "deine-email@gmail.com", // Deine Absender-E-Mail-Adresse
          pass: "dein-email-passwort", // Dein E-Mail-Passwort (ggf. App-Passwort verwenden)
        },
      });

      // E-Mail-Optionen definieren
      let mailOptions = {
        from: email,
        to: "empfaenger-email@gmail.com", // Ziel-E-Mail-Adresse
        subject: "Neue Kontaktanfrage",
        text: `Name: ${name}\nEmail: ${email}\nTelefon: ${phone}\nNachricht: ${message}`,
      };

      // E-Mail senden
      await transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({ message: "Nachricht erfolgreich gesendet!" });
    } catch (error) {
      console.error("Fehler beim Senden der E-Mail:", error);
      return res
        .status(500)
        .json({ error: "Fehler beim Senden der Nachricht." });
    }
  },
};
