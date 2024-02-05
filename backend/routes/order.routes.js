// import express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the order controller
const orderController = require("../controllers/order.controller");

// Create a route to handle the order request on POST
router.post("/api/order", orderController.createOrder);

// Create a route to handle the order request on get
router.get("/api/orders", orderController.getAllOrders);
// Create a route to handle the order request on get
router.get("/api/order/:order_id", orderController.getOrderById);
// Create a route to handle the order update request on put
router.put("/api/order/:order_id", orderController.updateOrder);

// Export the router
module.exports = router;
