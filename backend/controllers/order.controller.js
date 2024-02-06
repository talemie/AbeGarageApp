// Import the order service to handle communication with the database
const orderService = require("../services/order.service");
// import the vehicle service to check if the vehicle is exist or not before adding the order
const vehicleService = require("../services/vehicle.service");

// Create the create order controller
async function createOrder(req, res, next) {
	try {
		// console.log(req.body);
		const orderData = req.body;
		// check if customer exists in the database first
		const customer = await orderService.checkIfCustomerExists(
			orderData.customer_id
		);
		if (!customer) {
			res.status(400).json({
				error: "Customer not registered!",
			});
			return;
		}
		// check if the selected vehicle exists in the database first
		const vehicle = await vehicleService.getSingleVehicleById(
			orderData.vehicle_id
		);

		if (!vehicle) {
			res.status(400).json({
				error: "This Vehicle is not registered!",
			});
			return;
		}

		// call the createOrder method from the order service
		const order = await orderService.createOrder(orderData);
		if (order) {
			res.status(200).json({
				status: "true",
				msg: "Order added successfully!",
			});
		} else {
			res.status(400).json({
				error: "Failed to add the order!",
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error: "Something went wrong!",
		});
	}
}

// Create the get orders controller
async function getAllOrders(req, res, next) {
	try {
		// calling  the getAllOrders method of the Order Service
		const allOrders = await orderService.getAllOrders();
		if (allOrders) {
			res.status(200).json(allOrders);
		} else if (allOrders.length == 0) {
			res.status(200).json({
				data: "No Orders Found",
			});
		} else {
			res.status(400).json({
				error: "Failed to get all orders!",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: "Something went wrong!",
		});
	}
}

// Create the get single order controller
async function getOrderById(req, res, next) {
	const { order_id } = req.params; // getting the order_id from the url parameter
	try {
		// calling the getOrderByID method in the Order service and passing the order_id as a param
		const order = await orderService.getOrderById(order_id);
		if (order.length == 0) {
			return res.status(404).json({
				message: "This Order does not exist.",
			});
		} else {
			return res.status(200).json(order);
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: "Something went wrong!",
		});
	}
}

// Create the update order controller
async function updateOrder(req, res, next) {
	let updatedOrder = req.body; // Getting the new data for the order from the request body
	const { order_id } = req.params; // Getting the order id from the URL parameters
	// check if the order exist before updating
	const order = await orderService.getOrderById(order_id);
	if (!order) {
		return res.status(404).json({
			message: "This Order does not exist.",
		});
	}

	try {
		// Calling the updateOrder method of the Order Service and passing the order_id and the updated
		const result = await orderService.updateOrder(order_id, updatedOrder);
		if (result === null) {
			return res
				.status(404)
				.json({ message: "The Order you want to update is not found" });
		} else {
			res
				.status(200)
				.json({ status: "true", msg: "Order updated successfully!" });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: "Something went wrong!",
		});
	}
}

// export functions
module.exports = { createOrder, getAllOrders, getOrderById, updateOrder };