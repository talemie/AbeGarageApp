// import service service
const serviceService = require("../services/service.service");
// Create the get all services controller
async function getAllServices(req, res, next) {
	const data = await serviceService.getAll(req.body.service_name);
	try {
	} catch (error) {}
}

async function updateService(req, res, next) {
	// / A function to check if service exists in the database
	const serviceExists = await serviceService.checkIfServiceExists(
		req.body.service_name
	);
	//  If service doesn't exist send error message back to the admin
	if (!serviceExists)
		return res.status(400).json({ error: "Service doesn't exist!" });
	// If service exists proceed with updating the service
	else {
		try {
		} catch (error) {}
	}
}

// Export the update service controller methods
module.exports = { getAllServices, getSingleServices, updateService };
const serviceService = require("../services/service.service");

// write a function to get all services
async function getAllServices(req, res, next) {
	try {
		const services = await serviceService.getAllServices();
		res.status(200).json({
			services,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}

// Get Single Service
async function getSingleService(req, res) {
	try {
		const serviceId = req.params.id;
		const service = await serviceService.getSingleService(serviceId);
		res.json(service);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

// Add New Service
async function addNewService(req, res) {
	try {
		const { service_name, service_description } = req.body;
		await serviceService.addNewService(service_name, service_description);
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

//  write a function to update services
async function updateService(req, res, next) {
	try {
		const updatedService = await serviceService.updateService(
			req.params.service_id,
			req.body
		);

		if (!updatedService)
			return res.status(404).json({ message: "service not found" });
		res.status(200).json({ status: "true", message: updatedService });
	} catch (error) {
		console.error("Error fetching services:", error);

		// Provide a meaningful response to the client
		res.status(500).json({
			error: "Internal Server Error",
			message:
				"An error occurred while fetching services. Please try again later.",
		});
	}
}

// Export the finctions
module.exports = {
	getAllServices,
	getSingleService,
	addNewService,
	updateService,
};
