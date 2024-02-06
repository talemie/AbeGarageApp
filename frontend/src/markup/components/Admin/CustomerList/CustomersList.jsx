
import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";

import customerService from "../../../../services/customer.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faEdit,
	faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// Create the CustomersList component
const CustomersList = () => {
	const [showModal, setShowModal] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const { customer } = useAuth();
	let token = null;
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [showActiveConfirmation, setShowActiveConfirmation] = useState(false);
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState(customers);



const handleSearch = () => {
	const lowerCaseSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";

	const foundCustomer = customers.find((customer) => {
		console.log("Customer Data:", customer); // Log the entire customer object

		const {
			customer_first_name,
			customer_last_name,
			customer_phone_number,
			customer_email,
		} = customer;

		return (
			(customer_first_name
				? customer_first_name.toLowerCase().includes(lowerCaseSearchTerm)
				: false) ||
			(customer_last_name
				? customer_last_name.toLowerCase().includes(lowerCaseSearchTerm)
				: false) ||
			(customer_phone_number
				? customer_phone_number.includes(searchTerm)
				: false) ||
			(customer_email
				? customer_email.toLowerCase().includes(lowerCaseSearchTerm)
				: false)
		);
	});

	console.log("Found Customer:", foundCustomer); // Log the found customer

	setSearchResults(foundCustomer ? [foundCustomer] : []);
};



	  const handleEditClick = (customer) => {
			setSelectedCustomer(customer);
			setShowModal(true);
			navigate("/admin/customr/edit/:id");
			console.log("Edit:", customer);
		};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleSaveChanges = () => {
		setShowModal(false);
	};

	const handleActiveClick = (customer) => {
		setSelectedCustomer(customer);
		setShowActiveConfirmation(true);
	};

	const handleActiveConfirm = () => {
		console.log("Active:", selectedCustomer);
		setShowActiveConfirmation(false);
	};

	const handleActiveCancel = () => {
		setShowActiveConfirmation(false);
	};

	if (customer) {
		token = customer.employee_token;
	}

	useEffect(() => {
		// Call the getAllCustomers function
		const allCustomers = customerService.getAllCustomers(token);
		allCustomers
			.then((res) => {
				if (!res.ok) {
					console.log(res.status);
					setApiError(true);
					if (res.status === 401) {
						setApiErrorMessage("Please login again");
					} else if (res.status === 403) {
						setApiErrorMessage("You are not authorized to view this page");
					} else {
						setApiErrorMessage("Please try again later");
					}
					throw new Error("API error");
				}
				return res.json();
			})
			.then((data) => {
				// Check if data and data.customers are defined
				if (data && data.customers) {
					if (data.customers.length !== 0) {
						setCustomers(data.customers);
					} else {
						setCustomers([]);
					}
				} else {
					setCustomers([]);
				}
			})
			.catch((err) => {
				// Handle error
				console.error(err);
			});
	}, []); // Include token as a dependency

	return (
		<>
			{showModal && (
				<Modal show={showModal} onHide={handleModalClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Customer</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{/* Render the form or content for editing */}
						{/* For example: */}
						<form>{/* form fields */}</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleModalClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleSaveChanges}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			)}
			{showActiveConfirmation && (
				<div>
					<p>Are you sure you want to activate this customer?</p>
					<Button variant="success" onClick={handleActiveConfirm}>
						Yes
					</Button>{" "}
					<Button variant="danger" onClick={handleActiveCancel}>
						No
					</Button>
				</div>
			)}
			{apiError ? (
				<section className="contact-section">
					<div className="auto-container">
						<div className="contact-title">
							<h2>{apiErrorMessage}</h2>
						</div>
					</div>
				</section>
			) : (
				<>
					<section className="contact-section">
						<div className="auto-container">
							<div className="contact-title">
								<h2>Customers</h2>
							</div>
							<div style={{ position: "relative", display: "flex" }}>
								<input
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search customers..."
									style={{ width: "100%" }}
								/>
								<FontAwesomeIcon
									icon={faSearch}
									onClick={handleSearch}
									style={{
										position: "absolute",
										right: "8px",
										top: "50%",
										transform: "translateY(-50%)",
										cursor: "pointer",
									}}
								/>
							</div>
<br />
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>ID</th>
										<th>First Name</th>
										<th>Last Name</th>
										<th>Email</th>
										<th>Phone Number</th>
										<th>Added Date</th>
										<th>Active</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{customers.map((customer) => (
										<tr key={customer.customer_id}>
											<td>{customer.customer_id}</td>
											<td>{customer.customer_first_name}</td>
											<td>{customer.customer_last_name}</td>
											<td>{customer.customer_email}</td>
											<td>{customer.customer_phone_number}</td>
											<td>{customer.customer_added_date}</td>
											<td>
												{customer.active_customer_status === 1 ? (
													<Button
														variant="danger"
														onClick={() => handleActiveClick(customer)}
													>
														No
													</Button>
												) : (
													<Button
														variant="success"
														onClick={() => handleActiveClick(customer)}
													>
														Yes
													</Button>
												)}
											</td>
											<td>
												<button onClick={() => handleEditClick(customer)}>
													<FontAwesomeIcon icon={faEdit} />
													Edit
												</button>
											</td>
										</tr>
									))}
								</tbody>
								</Table>
								
						</div>
					</section>
				</>
			)}
		</>
	);
};

// Export the CustomersList component
export default CustomersList;
