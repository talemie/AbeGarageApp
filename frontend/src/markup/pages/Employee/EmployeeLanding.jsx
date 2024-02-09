import React from "react";
import OrdersList from "../../components/Admin/Orders/OrdersList/OrdersList";

function EmployeeLanding() {
	return (
		<div className="mt-5 ml-5">
			<h1>Welcome Employees all orders are shown below</h1>
			<div>
				<OrdersList />
			</div>
		</div>
	);
}

export default EmployeeLanding;
