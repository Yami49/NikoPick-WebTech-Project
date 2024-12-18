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
  findAll: async function (req, res) {
    try {
      const category = await Category.find().populate("products");
      return res.json(category);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden der Kategorien.",
        details: error,
      });
    }
  },
  // Eine einzelne Kategorie finden
  findOne: async function (req, res) {
    try {
      const category = await Category.findOne({
        categoryId: req.params.categoryId,
      }).populate("products");

      if (!category) {
        return res.status(404).json({ error: "Kategorie nicht gefunden." });
      }

      return res.json(category);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden der Kategorie.",
        details: error.message,
      });
    }
  },
  // Kategorie löschen
  delete: async function (req, res) {
    try {
      const { categoryId } = req.params;
      const deletedCategory = await Category.destroyOne({
        categoryId: parseInt(categoryId),
      });

      if (!deletedCategory) {
        return res.status(404).json({ error: "Kategorie nicht gefunden." });
      }

      return res.status(204).send();
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Löschen der Kategorie.",
        details: error.message,
      });
    }
  },
};
