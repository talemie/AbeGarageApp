// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// A function to check if vehicle exists in the database
async function checkIfVehicleExists(vehicle_serial) {
	const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_serial = ? ";
	const rows = await conn.query(query, [vehicle_serial]);
	// console.log(rows);
	if (rows.length > 0) {
		return true;
	}
	return false;
}
// A function to create a new vehicle
async function createVehicle(vehicle) {
	let createdVehicle = "";
	try {
		const query =
			"INSERT INTO customer_vehicle_info (customer_id, vehicle_year,vehicle_make,vehicle_model,vehicle_type,vehicle_mileage,vehicle_tag,vehicle_serial,vehicle_color) VALUES (?,?,?,?,?,?,?,?,?)";
		const rows = await conn.query(query, [
			employee.employee_email,
			employee.active_employee,
		]);
		// console.log(rows);
		if (rows.affectedRows !== 1) {
			return false;
		}
	} catch (error) {}
}

// A function to get vehicle by vehicle_id
async function getSingleVehicleByid(id) {
	try {
		const returnData = {};
		const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ? ";
		const rows = await conn.query(query, [id]);
		if (rows.length === 0) {
			returnData = {
				status: "fail",
				message: "vehicle does not exist",
			};
			return returnData;
		}
		returnData = {
			status: "success",
			data: rows[0],
		};
		return returnData;
	} catch (error) {
		console.log(error.message);
	}
}

// Export the functions for use in the controller
module.exports = {
	checkIfVehicleExists,
	createVehicle,
	getSingleVehicleByid,
};
