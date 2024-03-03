var express = require("express");
const { isAuthenticated } = require("../middlewares/jwt");
const {
  validate,
  customerValidationSchema,
} = require("../middlewares/validation");
const {
  createCustomer,
  getSingleCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/CustomerController");

var router = express.Router();

router.post("/create", validate(customerValidationSchema), createCustomer);
router.get("/", getAllCustomer);
router.get("/:id", getSingleCustomer);
router.put("/update/:id", updateCustomer);
router.delete("/delete/:id", deleteCustomer);

module.exports = router;
