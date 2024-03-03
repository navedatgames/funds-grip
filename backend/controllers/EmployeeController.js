const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const apiResponse = require("../helpers/apiResponse");
const { constants } = require("../helpers/constants");
const { Employee } = require("../models");

// CREATE Employee
const createEmployee = async (req, res, next) => {
  try {
    const { email, name, phoneNumber, city, uidai } = req.body;
    const emailExists = await Employee.findOne({ email });
    if (emailExists === null) {
      const employee = await Employee.create({
        email,
        name,
        phoneNumber,
        city,
        uidai,
      });

      return apiResponse.successResponseWithData(
        res,
        constants.employee_created,
        employee
      );
    }
    return apiResponse.validationErrorWithData(res, "Email Already in use.");
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};

// GET ALL Employee
const getAllEmpoyee = catchAsyncError(async (req, res, next) => {
  try {
    const employee = await Employee.find();
    return apiResponse.successResponseWithData(res, "success", employee);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
});

// GET SINGLE Employee
const getSingleEmployee = catchAsyncError(async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return apiResponse.notFoundResponse(res, constants.employee_notFound);
    }
    return apiResponse.successResponseWithData(
      res,
      "Employee Details",
      employee
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
});

// UPDATE Employee
const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return apiResponse.notFoundResponse(res, constants.employee_notFound);
    }

    const employees = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false,
        validators: true,
      }
    );

    return apiResponse.successResponseWithData(
      res,
      constants.employee_updated,
      employees
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};

// DELETE Employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return apiResponse.notFoundResponse(res, constants.employee_notFound);
    }

    await Employee.findByIdAndRemove(req.params.id);

    return apiResponse.successResponseWithData(
      res,
      constants.employee_deleted,
      employee
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
    s;
  }
};

module.exports = {
  createEmployee,
  getAllEmpoyee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
