module.exports = {
  dashboard: async function (req, res) {
    try {
      return res.view("admin/dashboard"); // Beispiel für eine View-Response
    } catch (error) {
      return res.serverError(error);
    }
  },
};
