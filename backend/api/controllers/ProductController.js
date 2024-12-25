module.exports = {
  // Produkt erstellen
  create: async function (req, res) {
    try {
      const { name, description, price, category } = req.body;

      // Validierung der Eingabedaten
      if (!name || !price) {
        return res.badRequest({
          error: "Name und Preis sind erforderlich.",
        });
      }

      const product = await Product.create({
        name,
        description,
        price,
        category,
      }).fetch();

      return res.status(201).json(product);
    } catch (error) {
      console.error("Fehler beim Erstellen des Produkts:", error);
      return res.serverError({
        error: "Fehler beim Erstellen des Produkts.",
        details: error.message,
      });
    }
  },

  // Alle Produkte anzeigen mit Paginierung und Filterung
  findAll: async function (req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        name,
        minPrice,
        maxPrice,
        category,
      } = req.query;

      const filters = {};

      // Filterlogik
      if (name) {
        filters.name = { contains: name };
      }
      if (minPrice) {
        filters.price = { ">=": parseFloat(minPrice) };
      }
      if (maxPrice) {
        filters.price = { "<=": parseFloat(maxPrice) };
      }
      if (category) {
        filters.category = category;
      }

      const products = await Product.find(filters)
        .populate("category")
        .skip((page - 1) * limit)
        .limit(limit);

      const totalProducts = await Product.count(filters);

      return res.json({
        data: products,
        meta: {
          total: totalProducts,
          page: parseInt(page),
          limit: parseInt(limit),
        },
      });
    } catch (error) {
      console.error("Fehler beim Laden der Produkte:", error);
      return res.serverError({
        error: "Fehler beim Laden der Produkte.",
        details: error.message,
      });
    }
  },

  // Einzelnes Produkt anzeigen
  findOne: async function (req, res) {
    try {
      const product = await Product.findOne({
        productId: req.params.productId,
      }).populate("category");

      if (!product) {
        return res.notFound({
          error: "Produkt nicht gefunden.",
        });
      }

      return res.json(product);
    } catch (error) {
      console.error("Fehler beim Laden des Produkts:", error);
      return res.serverError({
        error: "Fehler beim Laden des Produkts.",
        details: error.message,
      });
    }
  },

  // Produkt aktualisieren
  update: async function (req, res) {
    try {
      const { name, description, price, category } = req.body;

      // Validierung der Eingabedaten
      if (!name || !price) {
        return res.badRequest({
          error: "Name und Preis sind erforderlich.",
        });
      }

      const updatedProduct = await Product.updateOne({
        productId: req.params.productId,
      }).set({
        name,
        description,
        price,
        category,
      });

      if (!updatedProduct) {
        return res.notFound({
          error: "Produkt nicht gefunden.",
        });
      }

      return res.json(updatedProduct);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Produkts:", error);
      return res.serverError({
        error: "Fehler beim Aktualisieren des Produkts.",
        details: error.message,
      });
    }
  },

  // Produkt löschen
  delete: async function (req, res) {
    try {
      const deletedProduct = await Product.destroyOne({
        productId: req.params.productId,
      });

      if (!deletedProduct) {
        return res.notFound({
          error: "Produkt nicht gefunden.",
        });
      }

      return res.json({ message: "Produkt erfolgreich gelöscht." });
    } catch (error) {
      console.error("Fehler beim Löschen des Produkts:", error);
      return res.serverError({
        error: "Fehler beim Löschen des Produkts.",
        details: error.message,
      });
    }
  },
};
