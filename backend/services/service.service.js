const conn = require("../config/db.config");

// Get Single Service
async function getSingleService(serviceId) {
  try {
    const query = "SELECT * FROM common_services WHERE service_id = ?";
    const [service] = await conn.query(query, [serviceId]);
    return service;
  } catch (error) {
    throw error;
  }
}

// Add New Service
async function addNewService(serviceName, serviceDescription) {
  try {
    const query =
      "INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";
    await conn.query(query, [serviceName, serviceDescription]);
  } catch (error) {
    throw error;
  }
}

//export
module.exports = { getSingleService, addNewService };
