const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

// Get all routes for customers
router.get("/api/customers", customerController.getAllCustomers);
// Get routes for customer by ID
router.get("/api/customer/:id", customerController.getSingleCustomer);
// Create routes for customers
router.post("/api/customer", customerController.createCustomer);
// Updateroutes for customer
router.put("/api/customer/:id", customerController.updateCustomer);

module.exports = router;
