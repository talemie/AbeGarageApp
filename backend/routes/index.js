let express = require("express");

let router = express.Router();

let installRouter = require("./install.routes");

const employeeRouter = require('./employee.routes');
const loginRoutes = require("./login.routes");


router.use(installRouter);
router.use(employeeRouter);
router.use(loginRoutes);

module.exports = router;
