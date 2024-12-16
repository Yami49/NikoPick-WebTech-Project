module.exports = {
  // Transaktion erstellen
  create: async function (req, res) {
    try {
      const { customerName, transactionType, amount, description } = req.body;
      const transaction = await Transaction.create({
        customerName,
        transactionType,
        amount,
        description,
      }).fetch();
      return res.json(transaction);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Alle Transaktionen abrufen
  findAll: async function (req, res) {
    try {
      const transactions = await Transaction.find();
      return res.json(transactions);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Transaktionsdetails löschen
  delete: async function (req, res) {
    try {
      await Transaction.destroyOne({ id: req.params.id });
      return res.json({ message: "Transaktion gelöscht" });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
