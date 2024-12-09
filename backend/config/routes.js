/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },

  "GET /api/hello": "TestController.hello",
  "GET /api/test-connection": "UserController.testConnection",

  /* ProductController*/
  "POST /api/products": "ProductController.create",
  "GET /api/products": "ProductController.findAll",
  "GET /api/products/:id": "ProductController.findOne",
  "PUT /api/products/:id": "ProductController.update",
  "DELETE /api/products/:id": "ProductController.delete",
  "GET /api/products/search": "ProductController.find",

  /* CategoryController */
  "POST /api/categories": "CategoryController.create",
  "GET /api/categories": "CategoryController.findAll",
  "DELETE /api/categories/:id": "CategoryController.delete",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
