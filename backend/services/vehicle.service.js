// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// A function to check if vehicle exists in the database
async function checkIfVehicleExists(vehicle_serial) {
  try {
    const query =
      "SELECT * FROM customer_vehicle_info WHERE vehicle_serial = ?";
    const rows = await conn.query(query, [vehicle_serial || ""]);
    return rows.length > 0;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

// A function to create a new vehicle
async function createVehicle(vehicle) {
  try {
    let createdVehicle = "";

    const query1 =
      "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?";
    const rows1 = await conn.query(query1, [vehicle.customer_id]);

    if (rows1.length === 0) {
      createdVehicle = {
        status: "fail",
        message: `There is no customer with an ID of ${vehicle.customer_id}`
      };
      return createdVehicle;
    }

    const customerId = rows1[0].customer_id;

    const query =
      "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const rows = await conn.query(query, [
      customerId,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color
    ]);

    if (rows.affectedRows !== 1) {
      createdVehicle = {
        status: "fail",
        message: "Failed to add the vehicle!"
      };
      return createdVehicle;
    }

    createdVehicle = {
      vehicle_make: vehicle.vehicle_make,
      owner: rows1[0].customer_first_name
    };

    return createdVehicle;
  } catch (error) {
    console.log(error.message);
  }
}

// A function to update vehicle
async function updateVehicle(id, updates) {
  try {
    const query =
      "UPDATE customer_vehicle_info SET vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ? WHERE vehicle_id = ?";
    const rows = await conn.query(query, [
      updates.vehicle_year,
      updates.vehicle_make,
      updates.vehicle_model,
      updates.vehicle_type,
      updates.vehicle_mileage,
      updates.vehicle_tag,
      updates.vehicle_serial,
      updates.vehicle_color,
      id
    ]);

    if (rows.length === 0) {
      const returnData = {
        status: "fail",
        message: "Vehicle does not exist"
      };
      return returnData;
    }

    const returnData = {
      ...updates
    };

    return returnData;
  } catch (error) {
    console.log(error.message);
  }
}

async function getSingleVehicleById(vehicle_Id) {
  try {
    const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?";
    const rows = await conn.query(query, [vehicle_Id]);

    if (rows.length === 0) {
      return false;
    }

    return rows[0];
  } catch (error) {
    console.log(error.message);
  }
}

async function getVehiclesPerCustomer(customer_id) {
  try {
    const query = "SELECT * FROM customer_vehicle_info WHERE customer_id = ?";
    const rows = await conn.query(query, [customer_id]);

    if (rows.length === 0) {
      const returnData = {
        status: "fail",
        message: "Vehicle does not exist"
      };
      return returnData;
    }

    return rows; // Assuming there is only one customer with a given ID
  } catch (error) {
    console.log(error.message);
  }
}

// Export all functions for use in the controller
module.exports = {
  checkIfVehicleExists,
  createVehicle,
  updateVehicle,
  getSingleVehicleById,
  getVehiclesPerCustomer
};
