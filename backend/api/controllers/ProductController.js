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
      // Validierung der Eingabeparameter
      const { name, description, price, category } = req.body;
      const productId = parseInt(req.params.productId, 10);

      if (isNaN(productId)) {
        return res.status(400).json({ error: "Ungültige Produkt-ID." });
      }

      // Sicherstellen, dass die notwendigen Felder vorhanden sind
      if (!name && !description && !price && !category) {
        return res.status(400).json({
          error:
            "Mindestens ein Feld (name, description, price, category) muss angegeben werden.",
        });
      }

      // Aktualisierung des Produkts
      const updatedProduct = await Product.updateOne({ productId }).set({
        name,
        description,
        price,
        category,
      });

      // Überprüfen, ob ein Produkt aktualisiert wurde
      if (!updatedProduct) {
        return res.status(404).json({ error: "Produkt nicht gefunden." });
      }

      // Erfolgreiche Aktualisierung zurückgeben
      return res.status(200).json(updatedProduct);
    } catch (error) {
      // Fehlerbehandlung
      console.error("Fehler beim Aktualisieren des Produkts:", error);
      return res.status(500).json({
        error: "Fehler beim Aktualisieren des Produkts.",
        details: error.message,
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
