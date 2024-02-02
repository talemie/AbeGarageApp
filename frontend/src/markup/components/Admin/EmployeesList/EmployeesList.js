// Import the necessary components 
import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
// Import the auth hook  
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the date-fns library 
import { format } from 'date-fns'; // To properly format the date on the table 
// Import the getAllEmployees function  
import employeeService from "../../../../services/employee.service";

// Create the EmployeesList component 
const EmployeesList = () => {
  // Create all the states we need to store the data
  // Create the employees state to store the employees data  
  const [employees, setEmployees] = useState([]);
  // A state to serve as a flag to show the error message 
  const [apiError, setApiError] = useState(false);
  // A state to store the error message 
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // To get the logged in employee token
  const { employee } = useAuth();
  let token = null; // To store the token 

   // add state variables for edit and delete
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

     // Function to handle edit click
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    // You can open a modal or navigate to the edit page here
    // For simplicity, let's just log the selected employee for now
    console.log("Edit:", employee);
  };

  // Function to handle delete click
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteConfirmation(true);
  };

     // Function to confirm delete action
  const handleDeleteConfirm = () => {
    // Perform delete action here using the selectedEmployee data
    // After successful delete, you can update the employees state accordingly
    console.log("Delete:", selectedEmployee);
    // Close delete confirmation
    setShowDeleteConfirmation(false);
  };

  // Function to cancel delete action
  const handleDeleteCancel = () => {
    // Close delete confirmation
    setShowDeleteConfirmation(false);
  };

  

  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    // Call the getAllEmployees function 
    const allEmployees = employeeService.getAllEmployees(token);
    allEmployees.then((res) => {
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
      }
      return res.json()
    }).then((data) => {
      if (data.data.length !== 0) {
        setEmployees(data.data)
      }

    }).catch((err) => {
      // console.log(err);
    })
  }, []);

  return (
    <>
    {showDeleteConfirmation && (
        window.confirm("Are you sure you want to delete this employee?") && handleDeleteConfirm()
      )}
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div >
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2 >
              </div >
              < Table striped bordered hover >
                <thead>
                  <tr>
                    <th>Active</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td>{employee.active_employee ? "Yes" : "No"}</td>
                      <td>{employee.employee_first_name}</td>
                      <td>{employee.employee_last_name}</td>
                      <td>{employee.employee_email}</td>
                      <td>{employee.employee_phone}</td>
                      <td>{format(new Date(employee.added_date), 'MM - dd - yyyy | kk:mm')}</td>
                      <td>{employee.company_role_name}</td>
                      <td>
                        <div className="edit-delete-icons">
                          {/* Edit button */}
                          <span onClick={() => handleEditClick(employee)}>edit</span>
                          {" | "}
                          {/* Delete button */}
                          <span onClick={() => handleDeleteClick(employee)}>delete</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table >
            </div >
          </section >
        </>
      )}
    </>
  );
}

// Export the EmployeesList component 
export default EmployeesList;