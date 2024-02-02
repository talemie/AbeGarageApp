//import exoress module
const express = require("express");
//call router method  from express to create the router
const router = express.Router();
//import the service controller
let serviceController = require("../controllers/service.controller");
//create a route to handle post request for creating new service
router.post("/api/service", serviceController.addNewService);
// Create a route to handle the get all services request on get
router.get("/api/services", serviceController.getAllServices);
//create a route  to handle get a single services
router.get("/api/service/:id", serviceController.getSingleService);
// Create a route to handle the add service request on put
router.put("/api/service/:service_id", serviceController.updateService);
//export the router
module.exports = router;
