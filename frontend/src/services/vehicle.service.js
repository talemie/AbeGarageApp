// Import from the env
const api_url = import.meta.env.VITE_REACT_APP_API_URL;

// A function to send post request to create a new vehicle
const createVehicle = async (formData) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	};
	console.log(requestOptions);
	const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
	return response;
};

// A function to send get request to get single vehicle by vehicle_id
const getSingleVehicleById = async () => {
	// console.log(token);
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};
	const response = await fetch(`${api_url}/api/vehicle/:id`, requestOptions);
	return response;
};
// A function to send get request to get single vehicle by customer_id
const getVehiclesPerCustomer = async () => {
	// console.log(token);
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};
	const response = await fetch(
		`${api_url}/api/vehicles/:customer_id`,
		requestOptions
	);
	return response;
};

// Export all the functions
const vehicleService = {
	createVehicle,
	getSingleVehicleById,
	getVehiclesPerCustomer,
};
export default vehicleService;
