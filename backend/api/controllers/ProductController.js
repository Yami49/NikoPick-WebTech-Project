module.exports = {
  // Produkt erstellen
  create: async function (req, res) {
    try {
      const { name, description, price, category } = req.body;
      const product = await Product.create({
        name,
        description,
        price,
        category,
      }).fetch();
      return res.json(product);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Erstellen des Produkts.",
        details: error,
      });
    }
  },

  // Alle Produkte anzeigen
  findAll: async function (req, res) {
    try {
      const products = await Product.find().populate("category");
      return res.json(products);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden der Produkte.",
        details: error,
      });
    }
  },

  // Einzelnes Produkt anzeigen
  findOne: async function (req, res) {
    try {
      const product = await Product.findOne({
        productId: req.params.productId,
      }).populate("category");
      if (!product) return res.notFound({ error: "Produkt nicht gefunden." });
      return res.json(product);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden des Produkts.",
        details: error,
      });
    }
  },

  // Produkt aktualisieren
  update: async function (req, res) {
    try {
      const { name, description, price, category } = req.body;
      const updatedProduct = await Product.updateOne({
        productId: req.params.productId,
      }).set({
        name,
        description,
        price,
        category,
      });
      if (!updatedProduct)
        return res.notFound({ error: "Produkt nicht gefunden." });
      return res.json(updatedProduct);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Aktualisieren des Produkts.",
        details: error,
      });
    }
  },

  // Produkt löschen
  delete: async function (req, res) {
    try {
      await Product.destroyOne({ productId: req.params.productId });
      return res.json({ message: "Produkt erfolgreich gelöscht." });
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Löschen des Produkts.",
        details: error,
      });
    }
  },
};
