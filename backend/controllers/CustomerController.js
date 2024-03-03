const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const apiResponse = require("../helpers/apiResponse");
const { constants } = require("../helpers/constants");
const { Customer } = require("../models");

// CREATE Customer
const createCustomer = async (req, res, next) => {
  try {
    const { email, name, phoneNumber, city, profession } = req.body;
    const emailExists = await Customer.findOne({ email });
    if (emailExists === null) {
      const customer = await Customer.create({
        email,
        name,
        phoneNumber,
        city,
        profession,
      });

      return apiResponse.successResponseWithData(
        res,
        constants.customer_created,
        customer
      );
    }
    return apiResponse.validationErrorWithData(
      res,
      constants.email_already_used
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};

// GET ALL Customer
const getAllCustomer = catchAsyncError(async (req, res, next) => {
  try {
    const customer = await Customer.find();
    return apiResponse.successResponseWithData(res, "success", customer);
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
});

// GET SINGLE Customer
const getSingleCustomer = catchAsyncError(async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return apiResponse.notFoundResponse(res, constants.customer_notFound);
    }
    return apiResponse.successResponseWithData(
      res,
      "Customer Details",
      customer
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
});

// UPDATE Customer
const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return apiResponse.notFoundResponse(res, constants.customer_notFound);
    }

    const customers = await Customer.findByIdAndUpdate(
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
      constants.customer_updated,
      customers
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};

// DELETE Customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return apiResponse.notFoundResponse(res, constants.customer_notFound);
    }

    await Customer.findByIdAndRemove(req.params.id);

    return apiResponse.successResponseWithData(
      res,
      constants.customer_deleted,
      customer
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
    s;
  }
};

module.exports = {
  createCustomer,
  getAllCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
