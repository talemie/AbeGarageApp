import "./App.css";
import Home from "./markup/pages/Home";
// Import the Routes and Route components from react-router
import { Routes, Route } from "react-router";

// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// Import the custom css file
import "./assets/styles/custom.css";
import AddEmployee from "./markup/pages/admin/AddEmployee";
function App() {
	return (
		<>
			{/* <Header /> */}
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/admin/add-employee" element={<AddEmployee />}></Route>
			</Routes>
			{/* <Footer /> */}
		</>
	);
}

export default App;
