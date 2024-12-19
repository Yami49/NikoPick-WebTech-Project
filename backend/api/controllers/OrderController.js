module.exports = {
  // Bestellung erstellen
  create: async function (req, res) {
    try {
      const { user, status } = req.body;
      const order = await Order.create({ user, status }).fetch();
      return res.json(order);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Erstellen der Bestellung.",
        details: error,
      });
    }
  },

  // Alle Bestellungen anzeigen
  find: async function (req, res) {
    try {
      const orders = await Order.find().populate("user").populate("orderItems");
      return res.json(orders);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden der Bestellungen.",
        details: error,
      });
    }
  },
};
