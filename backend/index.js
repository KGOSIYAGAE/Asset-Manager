const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const { dbConnection } = require("./util/dbConnection");

const app = express();

//CORS Middleware
app.use(cors({ origin: "*" }));

//Determines what size file can be bulk added.
app.use(express.json({ limit: "900mb" }));

/*Update*/
//Admin
const adminRouter = require("./Routes/adminRoutes");
app.use("/api/v1/asset-manager/admin", adminRouter);

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

//Device logs
const deviceTransactionsRouter = require("./Routes/deviceTransactionsRoutes");
app.use("/api/v1/asset-manager/device-transactions", deviceTransactionsRouter);

//Device logs
const signatureRouter = require("./Routes/signatureRoutes");
app.use("/api/v1/asset-manager/signatures", signatureRouter);

//Search
const searchRouter = require("./Routes/searchRoutes");
app.use("/api/v1/asset-manager/search", searchRouter);

//send notifications
const notificationRouter = require("./Routes/notificationRoutes");
app.use("/api/v1/asset-manager/notification", notificationRouter);

//Repairs
const repairRouter = require("./Routes/deviceRepairRoutes");
app.use("/api/v1/asset-manager/repairs", repairRouter);

//Test Routes
const testRouter = require("./Routes/testRoutes");
const console = require("console");
app.use("/api/v1/asset-manager/session", testRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("join_session", (sessionId, callback) => {
    socket.join(sessionId);

    if (callback) {
      callback({ status: "success" });
    }

    console.log(`Socket ${socket.id} joined session: ${sessionId}`);
  });

  socket.on("submit_signature", ({ sessionId, image }, ackCallback) => {
    console.log(`Socket ${socket.id} signature submitted `);

    io.to(sessionId).emit("signature_saved", { image });

    console.log(`Signature brodcasted for session: ${sessionId}`);
  });

  socket.on("accept_disclaimer_consent", ({ sessionId }, ackCallback) => {
    console.log(`Socket ${socket.id} Accepted disclaimer and consent `);

    io.to(sessionId).emit("disclaimer_consent_accepted");

    console.log(`Returned after accaptance for session: ${sessionId}`);
  });
});

//////
server.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT);
});

/*app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT);
});*/
