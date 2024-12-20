module.exports = {
  // Bewertung erstellen
  create: async function (req, res) {
    try {
      const { rating, comment, user, product } = req.body;
      const newReview = await Review.create({
        rating,
        comment,
        user, // Benutzer-ID
        product, // Produkt-ID
      }).fetch();
      return res.json(newReview);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Erstellen der Bewertung.",
        details: error.message,
      });
    }
  },

  // Alle Bewertungen anzeigen
  find: async function (req, res) {
    try {
      const reviews = await Review.find().populate("user").populate("product");
      return res.json(reviews);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Laden der Bewertungen.",
        details: error.message,
      });
    }
  },
};
