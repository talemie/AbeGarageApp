// Import the vehicle service
const vehicleService = require("../services/vehicle.service");
// Create the add vehicle controller
async function createVehicle(req, res, next) {
	// Check if vehicle_serial already exists in the database
	const vehicleExists = await vehicleService.checkIfVehicleExists(
		req.body.vehicle_serial
	);
	if (vehicleExists) {
		res.status(400).json({
			error: "This vehicle is already registered!",
		});
	} else {
		try {
			const vehicleData = req.body;
			// Create the vehicle
			const vehicle = await vehicleService.createVehicle(vehicleData);
			if (!vehicle) {
				console.log(vehicle);
				res.status(400).json({
					error: "Failed to add the vehicle!",
				});
			} else {
				res.status(200).json({
					status: "true",
				});
			}
		} catch (error) {
			console.log(err);
			res.status(400).json({
				error: "Something went wrong!",
			});
		}
	}
}
// Create the get vehicle by id controller
async function getSingleVehicleByid(req, res, next) {
	try {
		const id = req.params.id;
		const vehicle = await vehicleService.getSingleVehicleByid(id);
		// If the vehicle is not found
		if (vehicle.status === "fail") {
			res.status(400).json({
				status: vehicle.status,
				message: vehicle.message,
			});
		}
		//if successful
		const vehicleInfo = {
			vehicle_id: vehicle.data.vehicle_id,
			customer_id: vehicle.data.customer_id,
			vehicle_year: vehicle.data.vehicle_year,
			vehicle_make: vehicle.data.vehicle_make,
			vehicle_model: vehicle.data.vehicle_model,
			vehicle_type: vehicle.data.vehicle_type,
			vehicle_mileage: vehicle.data.vehicle_mileage,
			vehicle_tag: vehicle.data.vehicle_tag,
			vehicle_serial: vehicle.data.vehicle_serial,
			vehicle_color: vehicle.data.vehicle_color,
		};
		res.status(200).json({
			status: "success",
			data: vehicleInfo,
		});
	} catch (error) {
		console.log(error.message);
	}
}
// Create the get vehicle by customer_id controller
async function getSingleVehicleBycustomurid(req, res, next) {}
// Create the update vehicle controller
async function updateVehicle(req, res, next) {}
// Export the createVehicle controller
module.exports = {
	createVehicle,
	getSingleVehicleByid,
	getSingleVehicleBycustomurid,
	updateVehicle,
};
