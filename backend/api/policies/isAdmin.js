module.exports = async function (req, res, proceed) {
  if (req.user && req.user.role === "admin") {
    return proceed(); // Erlaubt den Zugriff, wenn der Benutzer ein Admin ist
  }
  return res.forbidden("Nur Admins haben Zugriff auf diese Seite.");
};
