module.exports = {
  // Produkt erstellen
  create: async function (req, res) {
    try {
      const { productId, title, image, description, price, rating, category } =
        req.body;
      const product = await Product.create({
        productId,
        title,
        image,
        description,
        price,
        rating,
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
  find: async function (req, res) {
    try {
      const product = await Product.find()
        .populate("category")
        .populate("reviews");
      return res.json(product);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden der Produktliste.",
        details: error,
      });
    }
  },

  // Einzelnes Produkt anzeigen
  findOne: async function (req, res) {
    try {
      const product = await Product.findOne({ productId: req.params.productId })
        .populate("category")
        .populate("reviews");
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
      const { title, image, description, price, rating, category } = req.body;
      const updatedProduct = await Product.updateOne({
        productId: req.params.productId,
      }).set({ title, image, description, price, rating, category });

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
      const deletedProduct = await Product.destroyOne({
        productId: req.params.productId,
      });

      if (!deletedProduct)
        return res.notFound({ error: "Produkt nicht gefunden." });

      return res.json({ message: "Produkt erfolgreich gelöscht." });
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Löschen des Produkts.",
        details: error,
      });
    }
  },
};
