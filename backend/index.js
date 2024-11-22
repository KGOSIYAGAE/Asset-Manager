const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./dbConnection");

const app = express();

//CORS Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

//Staff Router
const StaffRouter = require("./Routes/staff.routes");
app.use("/users", StaffRouter);

//Staff Router
const StudentsRouter = require("./Routes/students.routes");
app.use("/users", StudentsRouter);

//Devices Router
const DevicesRouter = require("./Routes/devices.routes");
app.use("/devices", DevicesRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
