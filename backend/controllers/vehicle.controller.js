// Import the vehicle service
const vehicleService = require("../services/vehicle.service");

// Create the add vehicle controller
async function createVehicle(req, res, next) {
  try {
    // Check if vehicle_serial already exists in the database
    const vehicleExists = await vehicleService.checkIfVehicleExists(
      req.body.vehicle_serial
    );

    if (vehicleExists) {
      return res.status(400).json({
        error: "This vehicle is already registered!"
      });
    } else {
      const vehicleData = req.body;

      // Create the vehicle
      const vehicle = await vehicleService.createVehicle(vehicleData);

      if (vehicle.status === "fail") {
        return res.status(400).json({
          status: vehicle.status,
          message: vehicle.message
        });
      } else {
        return res.status(200).json({
          status: "true",
          vehicle: vehicle.vehicle_make,
          owner: vehicle.owner
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!"
    });
  }
}

// Create the update vehicle controller
async function updateVehicle(req, res, next) {
  try {
    const vehicleId = req.params.vehicle_id;
    const updatedVehicle = await vehicleService.updateVehicle(
      vehicleId,
      req.body
    );

    if (updatedVehicle.status === "fail") {
      return res.status(404).json({
        status: updatedVehicle.status,
        message: updatedVehicle.message
      });
    }

    return res.status(200).json({
      status: "success",
      updatedInfo: updatedVehicle
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
}

// Get single vehicle by ID controller
const getSingleVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await vehicleService.getSingleVehicleById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        error: "Vehicle not found"
      });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

// Create the get vehicle by customer_id controller
async function getVehiclesPerCustomer(req, res, next) {
  try {
    const id = req.params.customer_id;
    const vehicle = await vehicleService.getVehiclesPerCustomer(id);

    // If the vehicle is not found
    if (vehicle.status === "fail") {
      return res.status(400).json({
        status: vehicle.status,
        message: vehicle.message
      });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    console.log(error.message);
  }
}

// Export the createVehicle controller
module.exports = {
  createVehicle,
  updateVehicle,
  getSingleVehicleById,
  getVehiclesPerCustomer
};
