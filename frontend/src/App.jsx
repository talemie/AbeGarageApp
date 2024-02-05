import "./App.css";
import Home from "./markup/pages/Home";
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
// Import the PrivateAuthRoute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/unauthorized" element={<Unauthorized />}></Route>
				<Route path="/admin/employees" element={<Employees />}></Route>
				<Route
					path="/admin/add-employee"
					element={
						<PrivateAuthRoute roles={[3]}>
							<AddEmployee />
						</PrivateAuthRoute>
					}
				></Route>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
