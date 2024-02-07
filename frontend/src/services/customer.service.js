const api_url = import.meta.env.VITE_REACT_APP_API_URL;

const createCustomer = async (formData, loggedInEmployeeToken) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": loggedInEmployeeToken,
		},
		body: JSON.stringify(formData),
	};

	try {
		const response = await fetch(`${api_url}/api/customer`, requestOptions);
		return response;
	} catch (error) {
		console.error("Error creating customer:", error);
		throw error;
	}
};

const getAllCustomers = async (token) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};

	try {
		const response = await fetch(`${api_url}/api/customers`, requestOptions);
		return response;
	} catch (error) {
		console.error("Error fetching customers:", error);
		throw error;
	}
};

const updateCustomer = async (formData, loggedInEmployeeToken) => {
	const requestOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": loggedInEmployeeToken,
		},
		body: JSON.stringify(formData),
	};

	try {
		const response = await fetch(`${api_url}/api/customer/:id`, requestOptions);

		if (!response.ok) {
			throw new Error(`Failed to update customer. Status: ${response.status}`);
		}

		return response;
	} catch (error) {
		console.error("Error updating customer:", error);
		throw error;
	}
};

// A function to send get request to getCustomer
const getCustomer = async (customer_id) => {
	// console.log('customer id',customer_id);
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			// "x-access-token": token,
		},
	};
	try {
		const response = await fetch(
		`${api_url}/api/customer/${customer_id}`,
		requestOptions
	);
    // console.log('customer:',response);
	return response;
	} catch (error) {
		console.error("Error fetching customer:", error);
		throw error;
	}
	
};

const customerServices = {
	createCustomer,
	getAllCustomers,
	updateCustomer,
	getCustomer,
};

export default customerServices;
