//import exoress module
const express = require("express");
//call router method  from express to create the router
const router = express.Router();
//import the service controller
let serviceController = require("../controllers/service.controller");
//create a route to handle post request for creating new service
router.post("/api/service", serviceController.addNewService);
//create a route  to handle get a single services
router.get("/api/service/:id", serviceController.getSingleService);
//export the router
module.exports = router;
