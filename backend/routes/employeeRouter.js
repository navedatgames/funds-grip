var express = require("express");
const { isAuthenticated } = require("../middlewares/jwt");
const {
  createEmployee,
  getAllEmpoyee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/EmployeeController");
const {
  validate,
  employeeValidationSchema,
} = require("../middlewares/validation");

var router = express.Router();

router.post("/create", validate(employeeValidationSchema), createEmployee);
router.get("/", getAllEmpoyee);
router.get("/:id", getSingleEmployee);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
