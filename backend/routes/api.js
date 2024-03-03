const express = require("express");
const {
  authRouter,
  taskRouter,
  employeeRouter,
  customerRouter,
} = require("./index");
var app = express();

app.use("/auth/", authRouter);
app.use("/task/", taskRouter);
app.use("/employee", employeeRouter);
app.use("/customer", customerRouter);

module.exports = app;
