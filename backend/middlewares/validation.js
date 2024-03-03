const yup = require("yup");
const { constants } = require("../helpers/constants");
const { UserModel, Employee, Customer } = require("../models");

yup.addMethod(yup.string, "emailInUse", function (model, errorMessage) {
  return this.test(`email-in-use`, errorMessage, async function (email) {
    const { path, createError } = this;
    const exist = await model.findOne({ email });
    return !exist || createError({ path, message: errorMessage });
  });
});

const employeeValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be 3 characters long.")
    .max(15, "Name must not be 15 characters long.")
    .required("Name is required")
    .matches(constants.regex.NAME_REGEX, "Invalid Name Format"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required.")
    .matches(constants.regex.EMAIIL_REGEX, "Invalid email format")
    .emailInUse(Employee, "Email Address already in use."),
  phoneNumber: yup
    .string()
    .required("Phone Number is Required.")
    .matches(constants.regex.PHONE_NUMBER_REGEX, "Invalid Phone Number"),
  city: yup.string().required("City is required."),
  uidai: yup
    .string()
    .matches(constants.regex.UIDAI_REGEX, "Invalid UIDAI")
    .required("uidai is Required."),
});

const customerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be 3 characters long.")
    .max(15, "Name must not be 15 characters long.")
    .required("Name is required")
    .matches(constants.regex.NAME_REGEX, "Invalid Name Format"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required.")
    .matches(constants.regex.EMAIIL_REGEX, "Invalid email format")
    .emailInUse(Customer, "Email Address already in use."),
  phoneNumber: yup
    .string()
    .required("Phone Number is Required.")
    .matches(constants.regex.PHONE_NUMBER_REGEX, "Invalid Phone Number"),
  city: yup.string().required("City is required."),
  profession: yup.string().required("Profession is required."),
});

const taskValidationSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be 3 characters long.")
    .max(15, "Title must not be 15 characters long.")
    .required("Title is required"),
  description: yup
    .string()
    .min(3, "Description must be 3 characters long.")
    .max(100, "Description must not be 100 characters long.")
    .required("Description is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is Required.")
    .matches(constants.regex.PHONE_NUMBER_REGEX, "Invalid Phone Number"),
});

const userValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "FirstName must be 3 characters long.")
    .max(15, "FirstName must not be 15 characters long.")
    .required("FirstName is required")
    .matches(constants.regex.NAME_REGEX, "Invalid Name Format"),
  lastName: yup
    .string()
    .min(3, "LastName must be 3 characters long.")
    .max(15, "LastName must not be 15 characters long.")
    .required("LastName is required")
    .matches(constants.regex.NAME_REGEX, "Invalid Name Format"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required.")
    .matches(constants.regex.EMAIIL_REGEX, "Invalid email format")
    .emailInUse(UserModel, "Email Address already in use."),
  phoneNumber: yup
    .string()
    .required("Phone Number is Required.")
    .matches(constants.regex.PHONE_NUMBER_REGEX, "Invalid Phone Number"),
  password: yup
    .string()
    .min(8, "Password must be minimum 8 characters")
    .required("Passoword is Required.")
    .matches(
      constants.regex.PASSWORD_REGEX,
      "Password must be minimum 8 characters and contain one uppercase, one lowercase, one digit and one special characters"
    ),
});

const validate = (schema) => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.message;
    });
    res.status(400).send({ status: 400, message: "ValidationError", errors });
  }
};
module.exports = {
  employeeValidationSchema,
  customerValidationSchema,
  taskValidationSchema,
  userValidationSchema,
  validate,
};
