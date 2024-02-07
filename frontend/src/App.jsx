import "./App.css";
import Home from "./markup/pages/Home";
import About from "./markup/pages/About";
import Contact from "./markup/pages/Contact";
// Import the Routes and Route components from react-router
import { Routes, Route } from "react-router";

// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import Footer from "./markup/components/Footer/Footer";
// Import the custom css file
import "./assets/styles/custom.css";
// Import the Employees component

import Employees from "./markup/pages/admin/Employees";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import Unauthorized from "./markup/pages/Unauthorized";
import Login from "./markup/pages/Login";
import Header from "./markup/components/Header/Header";
import AddCustomers from "./markup/pages/admin/AddCustomers";
import Customers from "./markup/pages/admin/Customers";
import AdminDashboard from "./markup/pages/admin/Dashboard";
import ServicesManage from "./markup/pages/admin/ServicesManage";

// Import the PrivateAuthRoute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import ServicesPublic from "./markup/pages/ServicesPublic";
import Orders from "./markup/pages/admin/Orders";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/services" element={<ServicesPublic />} />
				<Route path="/login" element={<Login />}></Route>
				<Route path="/admin/add-employee" element={<AddEmployee />}></Route>
				<Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
				<Route path="/admin/services" element={<ServicesManage />} />
				<Route path="/unauthorized" element={<Unauthorized />}></Route>
				<Route path="/admin/employees" element={<Employees />}></Route>
				<Route path="/about" element={<About />}></Route>
				<Route path="/contact" element={<Contact />}></Route>
				<Route
					path="/admin/add-customer"
					element={
						<PrivateAuthRoute roles={[2, 3]}>
							<AddCustomers />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/customers"
					element={
						<PrivateAuthRoute roles={[2, 3]}>
							<Customers />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/add-employee"
					element={
						<PrivateAuthRoute roles={[3]}>
							<AddEmployee />
						</PrivateAuthRoute>
					}
				></Route>
				<Route
					path="/admin/orders"
					element={
						<PrivateAuthRoute roles={[1, 2, 3]}>
							<Orders />
						</PrivateAuthRoute>
					}
				/>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
