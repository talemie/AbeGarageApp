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
import EmployeeEdit from "./markup/pages/admin/EmployeeEdit";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import Unauthorized from "./markup/pages/Unauthorized";
import Login from "./markup/pages/Login";
import Header from "./markup/components/Header/Header";
import AddCustomers from "./markup/pages/admin/AddCustomers";
import Customers from "./markup/pages/admin/Customers";
import AdminDashboard from "./markup/pages/admin/Dashboard";
import ServicesManage from "./markup/pages/admin/ServicesManage";
import CustomerEditPage from "./markup/pages/admin/CustomerEditPage";
// Import the PrivateAuthRoute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import ServicesPublic from "./markup/pages/ServicesPublic";
import Orders from "./markup/pages/admin/Orders";
import NewOrder from "./markup/pages/admin/NewOrder";
import Four04 from "./markup/pages/Four04";
import ManagerLanding from "./markup/pages/managerPage/ManagerLanding";
import UpdateOrder from "./markup/pages/admin/UpdateOrder";
import OrdersDetail from "./markup/components/OrdersDetail/OrdersDetail";
import OrderDetail from "./markup/components/OrdersDetail/OrdersDetail";

function App() {
  const orderId = '1';
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPublic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/services" element={<ServicesManage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
		<Route path="/order/:order_hash" element={<OrderDetail />} /> 


        <Route
          path="/admin/employee/edit/:id"
          element={<EmployeeEdit />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<Four04 />} />
        <Route
          path="/managerlanding"
          element={
            <PrivateAuthRoute roles={[2]}>
              <ManagerLanding />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AdminDashboard />
            </PrivateAuthRoute>
          }
        />
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
          path="/admin/customer/edit/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerEditPage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Employees />
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
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <NewOrder />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order/:order_id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <OrdersDetail orderId={orderId} />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order/:order_id/edit"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <UpdateOrder />
            </PrivateAuthRoute>
          }
        />
				{/* <Route
					path="/admin/service/edit/:id"
					element={
						<PrivateAuthRoute roles={[2, 3]}>
							<EditService />
						</PrivateAuthRoute>
					}
				/> */}
			</Routes>
			<Footer />
		</>
	);
}

export default App;
