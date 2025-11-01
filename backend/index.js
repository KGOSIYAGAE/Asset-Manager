const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./util/dbConnection");

const app = express();

//CORS Middleware
app.use(cors({ origin: "*" }));

//Determines what size file can be bulk added.
app.use(express.json({ limit: "900mb" }));

/*Update*/
//Admin
const adminRouter = require("./Routes/adminRoutes");
app.use("/api/v1/asset-manager/admin/", adminRouter);

//Devices
const deviceRouter = require("./Routes/deviceRoutes");
app.use("/api/v1/asset-manager/devices", deviceRouter);

//Inovices
const invoiceRouter = require("./Routes/invoiceRouter");
app.use("/api/v1/asset-manager/invoices", invoiceRouter);

//Students
const studentRouter = require("./Routes/studentsRoutes");
app.use("/api/v1/asset-manager/students", studentRouter);

//Courses
const courseRouter = require("./Routes/courseRoutes");
app.use("/api/v1/asset-manager/courses", courseRouter);

//Staff
const staffRouter = require("./Routes/staffRoutes");
app.use("/api/v1/asset-manager/staff", staffRouter);

//Departments
const departmentRouter = require("./Routes/departmentRoutes");
app.use("/api/v1/asset-manager/departments", departmentRouter);

//Positions
const positionRouter = require("./Routes/positionRoutes");
app.use("/api/v1/asset-manager/positions", positionRouter);

//Device logs
const deviceLogRouter = require("./Routes/deviceLogRoutes");
app.use("/api/v1/asset-manager/device-logs", deviceLogRouter);

//Device logs
const signatureRouter = require("./Routes/signatureRoutes");
app.use("/api/v1/asset-manager/signatures", signatureRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT);
});
