// Import from the env
const api_url = import.meta.env.VITE_REACT_APP_API_URL;
// A function to send get request to get all orders
const getAllOrders = async (token) => {
	// console.log(token);
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			// "x-access-token": token,
		},
	};
	const response = await fetch(`${api_url}/api/orders`, requestOptions);
	return response;
};

// A function to send get request to add an order
const addOrder = async (formData) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// "x-access-token": token,
		},
		body: JSON.stringify(formData),
	};
	const response = await fetch(`${api_url}/api/order`, requestOptions);
	return response;
};
const orderService = {
	getAllOrders,
	addOrder,
};
// export this module
export default orderService;
