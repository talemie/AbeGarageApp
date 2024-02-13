import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../../../../Contexts/AuthContext";
import serviceService from "../../../../services/service.service";
import { useNavigate } from "react-router-dom";

const ServicesList = () => {
	const [services, setServices] = useState([]);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [selectedService, setSelectedService] = useState(null);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [newService, setNewService] = useState({ name: "", description: "" });
	const navigate = useNavigate();
	const { service } = useAuth();
	let token = null;
	const [loading, setLoading] = useState(true);

	// Function to confirm delete action
	const handleDeleteConfirm = () => {
		console.log("Delete:", selectedService);
		setShowDeleteConfirmation(false);
	};

	// Function to handle input changes for adding a new service
	const handleAddServiceInputChange = (e) => {
		const { name, value } = e.target;
		setNewService((prevService) => ({ ...prevService, [name]: value }));
	};

	// Function to handle adding a new service
	const handleAddService = async (e) => {
		e.preventDefault();

		try {
			const response = await serviceService.createService(token, newService);

			if (!response.ok) {
				setApiError(true);
				if (response.status === 401) {
					setApiErrorMessage("Please login again!");
				} else if (response.status === 403) {
					setApiErrorMessage("You are not authorized to perform this action!");
				} else {
					setApiErrorMessage(
						"Failed to add a new service. Please try again later!"
					);
				}
				throw new Error("Failed to add a new service!!");
			}

			const data = await response.json();

			if (data && data.service_id) {
				setServices((prevServices) => [...prevServices, data]);
				// Clear the input fields after adding a new service
				setNewService({ name: "", description: "" });
			}

			setLoading(false);
		} catch (error) {
			console.error(error);
			setApiError(true);
			setApiErrorMessage("An error occurred while adding a new service.");
			setLoading(false);
		}
	};
	// Function to handle edit click

	const handleEditService = (selectedService) => {
		navigate(`/admin/service/edit/` + selectedService.service_id);
		const updatedServices = services.map((service) =>
			service.service_id === selectedService.service_id
				? selectedService
				: service
		);
		setServices(updatedServices);
		setSelectedService(null); // Clear selectedService after editing
	};

	// Function to handle deleting a service
	const handleDeleteService = async () => {
		try {
			const response = await serviceService.deleteService(
				token,
				selectedService.service_id
			);

			if (!response.ok) {
				setApiError(true);
				if (response.status === 401) {
					setApiErrorMessage("Please login again!");
				} else if (response.status === 403) {
					setApiErrorMessage("You are not authorized to perform this action!");
				} else {
					setApiErrorMessage(
						"Failed to delete the service. Please try again later!"
					);
				}
				throw new Error("Failed to delete the service!!");
			}

			// Remove the deleted service from the state
			const updatedServices = services.filter(
				(service) => service.service_id !== selectedService.service_id
			);
			setServices(updatedServices);
			setShowDeleteConfirmation(false); // Close delete confirmation modal
			setSelectedService(null); // Clear selectedService after deleting
		} catch (error) {
			console.error(error);
			setApiError(true);
			setApiErrorMessage("An error occurred while deleting the service.");
		}
	};

	useEffect(() => {
		// Call the getAllservices function
		const allServices = serviceService.getAllServices(token);

		const getServices = async () => {
			allServices
				.then((res) => {
					console.log(res);
					if (!res.ok) {
						setApiError(true);
						if (res.status === 401) {
							setApiErrorMessage("Please login again!");
						} else if (res.status === 403) {
							setApiErrorMessage("You are not authorized to view this page!");
						} else {
							setApiErrorMessage("Please try again later!");
						}
						throw new Error("Failed to fetch data!!");
					}
					return res.json();
				})
				.then((data) => {
					if (data && data.length !== 0) {
						setServices(data.services);
					}
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		};
		getServices();
	}, []);
	// console.log(services);

	return (
		<>
			<div className="sec-title style-two">
				<h2>Services we provide</h2>
				<div className="text">
					Bring to the table win-win survival strategies to ensure proactive
					domination. At the end of the day, going forward, a new normal that
					has evolved from generation X is on the runway heading towards a
					streamlined cloud solution.
				</div>

				{showDeleteConfirmation &&
					window.confirm("Are you sure you want to delete this service?") &&
					handleDeleteConfirm()}
				{apiError ? (
					<section className="contact-section">
						<div className="auto-container">
							<div className="contact-title">
								<h2>{apiErrorMessage}</h2>
							</div>
						</div>
					</section>
				) : (
					<div className="wrapper-box selected-customer">
						<div className="left-column">
							{services?.map((service) => (
								<div
									className=" mt-2 px-3 service-item"
									key={service.service_id}
								>
									<h3 className="text-b">{service.service_name}</h3>
									<div className="row  ">
										<div className="col-11 ">
											<p> {service.service_description}</p>
										</div>
										<div className="col-1 ">
											<div className="edit-delete-icons ">
												<span
													className="text-danger pr-2"
													onClick={() => handleEditService(selectedService)}
												>
													<FaEdit />
												</span>

												<span onClick={() => handleDeleteService(service)}>
													<MdDelete />
												</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
			<section className="contact-section">
				<div className="auto-container">
					<div className="contact-title">
						<h2>Add a new service</h2>
					</div>
					<div className=" clearfix">
						<div className="form-column ">
							<div className="inner-column">
								<div className="contact-form">
									<form onSubmit={handleAddService}>
										<div className="row clearfix">
											<div className="form-group col-md-12">
												<input
													type="text"
													name="form_subject"
													placeholder="Service name"
													onChange={() => {
														handleAddService;
													}}
												/>
											</div>
											<div className="form-group col-md-12">
												<textarea
													name="form_message"
													placeholder="Service description"
													onChange={() => {
														handleAddService;
													}}
												></textarea>
											</div>

											<div className="form-group col-md-12">
												<button
													className="theme-btn btn-style-one"
													type="submit"
													data-loading-text="Loading..."
												>
													<span
														onChange={() => {
															handleAddService;
														}}
													>
														Add service
													</span>
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ServicesList;
