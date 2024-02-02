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
			if (vehicle.status === "fail") {
				res.status(400).json({
					status: vehicle.status,
					message: vehicle.message,
				});
			} else {
				res.status(200).json({
					status: "true",
					vehicle: vehicle.vehicle_make,
					owner: vehicle.owner,
				});
			}
		} catch (error) {
			console.log(error);
			res.status(400).json({
				error: "Something went wrong!",
			});
		}
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
			res.status(404).json({
				status: updatedVehicle.status,
				message: updatedVehicle.message,
			});
		}

		res.status(200).json({
			status: "success",
			updatedInfo: updatedVehicle,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}
// Export the createVehicle controller
module.exports = {
	createVehicle,
	updateVehicle,
};
