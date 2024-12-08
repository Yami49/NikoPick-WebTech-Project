module.exports = {
    // Create
    create: async function (req, res) {
        try {
          const { name, description, price, category } = req.body;
          const product = await Product.create({ name, description, price, category }).fetch();
          return res.json(product);
        } catch (error) {
          return res.serverError(error);
        }
    },
  
    // Read all
    findAll: async function (req, res) {
      try {
        const products = await Product.find();
        return res.json(products);
      } catch (error) {
        return res.serverError(error);
      }
    },
  
    // Read one
    findOne: async function (req, res) {
      try {
        const product = await Product.findOne({ id: req.params.id });
        return res.json(product);
      } catch (error) {
        return res.serverError(error);
      }
    },
  
    // Update
    update: async function (req, res) {
      try {
        const { name, description, price } = req.body;
        const product = await Product.updateOne({ id: req.params.id }).set({ name, description, price });
        return res.json(product);
      } catch (error) {
        return res.serverError(error);
      }
    },
  
    // Delete
    delete: async function (req, res) {
      try {
        await Product.destroyOne({ id: req.params.id });
        return res.json({ message: 'Product deleted' });
      } catch (error) {
        return res.serverError(error);
      }
    },

    // Suchfunktion
    find: async function (req, res) {
        try {
          const { name, minPrice, maxPrice } = req.query;
          const criteria = {};
      
          if (name) criteria.name = { contains: name };
          if (minPrice) criteria.price = { '>=': parseFloat(minPrice) };
          if (maxPrice) criteria.price = { '<=': parseFloat(maxPrice) };
      
          const products = await Product.find({ where: criteria });
          return res.json(products);
        } catch (error) {
          return res.serverError(error);
        }
      },
      
  };
  