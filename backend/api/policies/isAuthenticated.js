const jwt = require("jsonwebtoken");

module.exports = async function (req, res, proceed) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Kein Token vorhanden" });
    }

    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; // Benutzerinformationen zum Request hinzufügen
    return proceed();
  } catch (error) {
    return res.status(401).json({ error: "Ungültiges Token" });
  }
};
