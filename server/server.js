require("dotenv").config();
const helmet = require("helmet");
const session = require("express-session");
const csurf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");

// Importing routes
const userRoutes = require("./routes/userRoutes");
const siteFeedbacks = require("./routes/SiteFeedbackRoutes");
const E_billRoutes = require("./routes/E_billRoutes");
const Payments = require("./routes/Payment");
const orderedProductRoutes = require("./routes/orderedProductRoutes");
const orderRoutes = require("./routes/orderRoutes");
const Delivary = require("./routes/DelivaryRoutes");
const incomeHistory = require("./routes/incomeHistoryRoutes.js");
const supplierOrder = require("./routes/supplierOrderRoutes");
const Cart = require("./routes/Cart.js");
const inventoryProductRoutes = require("./routes/inventoryProductRoutes");
const inventoryRawMaterialRoutes = require("./routes/inventoryRawMaterialRoutes");
const inventoryProductOrderRoutes = require("./routes/InventoryProductOrderRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const supplierPaymentRoutes = require("./routes/supplierPaymentRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const factoryRoutes = require("./routes/factoryRoutes");
const machineRoutes = require("./routes/machineRoutes");
const machineStatsRoutes = require("./routes/machineStatsRoutes");
const rawDataRoutes = require("./routes/rawDataRoutes");

// Initialize express app
const app = express();

// Set up session middleware with conditional HTTPS support for cookies
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Only secure in production with HTTPS
  })
);

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up CSRF protection middleware
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// Example route with CSRF protection
app.get("/form", (req, res) => {
  res.send(`<form action="/process" method="POST">
                <input type="hidden" name="_csrf" value="${req.csrfToken()}">
                <button type="submit">Submit</button>
              </form>`);
});

app.post("/process", (req, res) => {
  res.send("Form processed");
});

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "trusted-scripts.example.com"],
        "style-src": ["'self'", "trusted-styles.example.com"],
        "img-src": ["'self'", "data:", "trusted-images.example.com"],
        "connect-src": ["'self'", "api.trusted-endpoint.com"],
        "frame-ancestors": ["'none'"],
        "object-src": ["'none'"],
        "base-uri": ["'self'"],
      },
    },
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/site-feedbacks", siteFeedbacks);
app.use("/api/v3/payment", Payments);
app.use("/api/v6/orders", orderRoutes);
app.use("/api/v7/orderedProduct", orderedProductRoutes);
app.use("/api/v8/incomeHistory", incomeHistory);
app.use("/api/v9/supplierOrder", supplierOrder);
app.use("/api/v1/eBill", E_billRoutes);
app.use("/api/v4/Delevery", Delivary);
app.use("/api/v5/Cart", Cart);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/inventoryProducts", inventoryProductRoutes);
app.use("/api/inventoryRawMaterials", inventoryRawMaterialRoutes);
app.use("/api/supplier-payment", supplierPaymentRoutes);
app.use("/api/machine", machineRoutes);
app.use("/api/machineStats", machineStatsRoutes);
app.use("/api/rawData", rawDataRoutes);
app.use("/api/inventoryProductOrder", inventoryProductOrderRoutes);

// File upload for inventory management
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      __dirname +
        "/../client/src/components/dashboard/inventoryManagement/uploadedImages"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});

// File upload for payment receipts
const fileStorageRecipt = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      __dirname +
        "/../client/src/components/dashboard/transactionManagement/uploadedRecipt"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadRecipt = multer({ storage: fileStorageRecipt });

app.post("/singleRecipt", uploadRecipt.single("imageRecipt"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        "Connected to DB and listening on port",
        process.env.PORT || 3000
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
