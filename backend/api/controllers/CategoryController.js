module.exports = {
    // Kategorie erstellen
    create: async function (req, res) {
      try {
        const { name, description } = req.body;
        const category = await Category.create({ name, description }).fetch();
        return res.json(category);
      } catch (error) {
        return res.serverError(error);
      }
    },
  
    // Alle Kategorien anzeigen
    findAll: async function (req, res) {
      try {
        const categories = await Category.find();
        return res.json(categories);
      } catch (error) {
        return res.serverError(error);
      }
    },
  
    // Kategorie löschen
    delete: async function (req, res) {
      try {
        await Category.destroyOne({ id: req.params.id });
        return res.json({ message: 'Kategorie gelöscht' });
      } catch (error) {
        return res.serverError(error);
      }
    },
  };
  