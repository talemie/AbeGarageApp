// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the vehicle controller
const vehicleControllers = require("../controllers/vehicle.controller");
// Create a route to handle the craete vehicle request on post
router.post("api/vehicle/", vehicleControllers.createVehicle);
// Create a route to handle the get single vehicle request on Get by vehicle_id
router.get("api/vehicles/:id", vehicleControllers.getSingleVehicleByid);
// Create a route to handle the get single vehicle request on Get by customer_id
router.get("api/vehicles/:customer_id", vehicleControllers.getSingleVehicleBycustomurid);
// Create a route to handle the update vehicle request on put
router.put("api/vehicle", vehicleControllers.updateVehicle);
// Export the router
module.exports = router;
