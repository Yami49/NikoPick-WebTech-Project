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
  "GET /api/products/:productId": "ProductController.findOne",
  "PUT /api/products/:productId": "ProductController.update",
  "DELETE /api/products/:productId": "ProductController.delete",
  "GET /api/products/search": "ProductController.find",
  "GET /products/:productId": "ProductController.findOne",

  /* CategoryController */
  "POST /api/categories": "CategoryController.create",
  "GET /api/categories": "CategoryController.findAll",
  "DELETE /api/categories/:id": "CategoryController.delete",

  /** AuthController */
  "POST /api/auth/login": "AuthController.login",
  "POST /api/auth/register": "AuthController.register",

  // UserController
  "GET /api/users/test-connection": "UserController.testConnection",
  "DELETE /api/users/:userId": "UserController.deleteUser",
  "GET /api/users": "UserController.find",
  "GET /api/users/:userId": "UserController.findOne",
  "PUT /api/users/:userId": "UserController.update",

  // MessageController
  "POST /api/messages": "MessageController.create",
  "GET /api/messages": "MessageController.find",
  "GET /api/messages/:messageId": "MessageController.findOne",
  "DELETE /api/messages/:messageId": "MessageController.delete",

  // TransactionController
  "POST /transactions": "TransactionController.create",
  "GET /transactions": "TransactionController.findAll",
  "DELETE /transactions/:id": "TransactionController.delete",

  // ReviewController
  "DELETE /api/reviews/:reviewId": "ReviewController.delete",

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
