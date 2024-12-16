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
  "GET /products/:id": "ProductController.findOne",

  /* CategoryController */
  "POST /api/categories": "CategoryController.create",
  "GET /api/categories": "CategoryController.findAll",
  "DELETE /api/categories/:id": "CategoryController.delete",

  /** AuthController */
  "POST /api/auth/login": "AuthController.login",
  "POST /api/auth/register": "AuthController.register",

  // UserController
  "GET /api/user/test-connection": "UserController.testConnection",
  "DELETE /api/user/:id": "UserController.deleteUser",
  "GET /api/user": "UserController.find",

  "POST /api/message": "MessageController.create",
  "GET /api/message": "MessageController.findAll",
  "DELETE /api/message": "MessageController.delete",

  "POST /transactions": "TransactionController.create",
  "GET /transactions": "TransactionController.findAll",
  "DELETE /transactions/:id": "TransactionController.delete",

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

  "GET /api/admin/dashboard": {
    controller: "AdminController",
    action: "dashboard",
    policy: "isAuthenticated",
    policy: "isAdmin",
  },
};
