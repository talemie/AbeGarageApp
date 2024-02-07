// Import from the env
const api_url = import.meta.env.VITE_REACT_APP_API_URL;
// A function to send get request to getServices
const getServices = async () => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			// "x-access-token": token,
		},
	};
	const response = await fetch(`${api_url}/api/services`, requestOptions);
	// console.log('services:',response);
	return response;
};

const serviceService = {
	getServices,
};
// export this module
export default serviceService;
