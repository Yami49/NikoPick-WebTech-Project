module.exports = {
  // Bewertung erstellen
  create: async function (req, res) {
    try {
      const { reviewId, rating, comment, user, product } = req.body;
      const review = await Review.create({
        reviewId,
        rating,
        comment,
        user,
        product,
      }).fetch();
      return res.json(review);
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Erstellen der Bewertung.",
        details: error,
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
        details: error,
      });
    }
  },

  // Bewertung löschen
  delete: async function (req, res) {
    try {
      await Review.destroyOne({ reviewId: req.params.reviewId });
      return res.json({ message: "Bewertung erfolgreich gelöscht." });
    } catch (error) {
      return res.serverError({
        error: "Fehler beim Löschen der Bewertung.",
        details: error,
      });
    }
  },
};
