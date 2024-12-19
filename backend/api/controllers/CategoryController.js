module.exports = {
  // Kategorie erstellen
  create: async function (req, res) {
    try {
      const { name, description } = req.body;
      const category = await Category.create({ name, description }).fetch();
      return res.json(category);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Erstellen der Kategorie.",
        details: error,
      });
    }
  },

  // Alle Kategorien anzeigen
  find: async function (req, res) {
    try {
      const categories = await Category.find().populate("products");
      return res.json(categories);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden der Kategorien.",
        details: error,
      });
    }
  },
};
