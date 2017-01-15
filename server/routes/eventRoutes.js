const controller = require('../controllers/eventController.js');
const express = require('express')
const router = express.Router();

for (const route in controller) {
  if(router.route) {
    router.route(route)
      .get(controller[route].get)
      .post(controller[route].post)
      .put(controller[route].put)
      .delete(controller[route].delete)
  }
}

module.exports = router

// const controllers = require('../controllers/eventCtrl.js');
// const router = require('express').Router();

// for (const route in controllers) {
//   if (router.route) {
//     router.route(route)
//       .get(controllers[route].get)
//       .post(controllers[route].post)
//       .put(controllers[route].put)
//       .delete(controllers[route].delete);
//   }
// }

// module.exports = router;
