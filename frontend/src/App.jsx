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
import AddEmployee from "./markup/pages/admin/AddEmployee";
import Login from "./markup/pages/Login";
import Header from "./markup/components/Header/Header";
import AdminDashboard from "./markup/pages/admin/Dashboard";
import ServicesManage from "./markup/pages/admin/ServicesManage";
function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/admin/add-employee" element={<AddEmployee />}></Route>
				<Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
				<Route
					path="/admin/services-manage"
					element={<ServicesManage />}
				></Route>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
