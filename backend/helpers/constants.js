exports.constants = {
  admin: {
    name: "admin",
    email: "admin@admin.com",
  },
  confirmEmails: {
    from: "no-reply@test-app.com",
  },
  regex: {
    NAME_REGEX: /^[a-zA-Z]+$/,
    EMAIIL_REGEX: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    PHONE_NUMBER_REGEX: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
    UIDAI_REGEX: /^\d{12}$/,
    PASSWORD_REGEX:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  },
  task_created: "Task Created Successfully",
  task_updated: "Task Updated Successfully",
  task_deleted: "Task Deleted Successfully",
  task_notFound: "Task Not Found",
  customer_created: "customer Created Successfully",
  customer_updated: "customer Updated Successfully",
  customer_deleted: "customer Deleted Successfully",
  customer_notFound: "customer Not Found",
  employee_updated: "Employee Updated Successfully",
  employee_deleted: "Employee Deleted Successfully",
  employee_notFound: "Employee Not Found",
  employee_created: "Employee Created Successfully",
  email_already_used: "Email Already in use.",
  customer_created: "Customer Created Successfully",
};
