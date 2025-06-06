const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./util/dbConnection");

const app = express();

//CORS Middleware
app.use(cors({ origin: "*" }));

//Determines what size file can be bulk added.
app.use(express.json({ limit: "1gb" }));

/*
//Staff Router
const StaffRouter = require("./Routes/staff.routes");
app.use("/users", StaffRouter);

//Staff Router
const StudentsRouter = require("./Routes/students.routes");
app.use("/users", StudentsRouter);

//Devices Router
const DevicesRouter = require("./Routes/devices.routes");
app.use("/devices", DevicesRouter);

//Login user Router
const UserRouter = require("./Routes/user.routes");
app.use("/auth", UserRouter);

dbConnection.connect((error) => {
  if (error) {
    return console.log("An error occured connecting the database.");
  }

  app.listen(process.env.PORT, () => {
    console.log("Database connected.");
    console.log("Server running on port", process.env.PORT);
  });
});
*/

/*Update*/
//Admin
const adminRouter = require("./Routes/adminRoutes");
app.use("/api/admin/", adminRouter);

//Devices
const deviceRouter = require("./Routes/deviceRoutes");
app.use("/api/devices", deviceRouter);

//Inovices
const invoiceRouter = require("./Routes/invoiceRouter");
app.use("/api/invoices", invoiceRouter);

//Students
const studentRouter = require("./Routes/studentsRoutes");
app.use("/api/students", studentRouter);

//Courses
const courseRouter = require("./Routes/courseRoutes");
app.use("/api/courses", courseRouter);

//Staff
const staffRouter = require("./Routes/staffRoutes");
app.use("/api/staff", staffRouter);

//Departments
const departmentRouter = require("./Routes/departmentRoutes");
app.use("/api/departments", departmentRouter);

//Positions
const positionRouter = require("./Routes/positionRoutes");
app.use("/api/positions", positionRouter);

//Device logs
const deviceLogRouter = require("./Routes/deviceLogRoutes");
app.use("/api/device-logs", deviceLogRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
