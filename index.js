require("dotenv").config(); // Load environment variables
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const sequelize = require("./config/database"); // Import already-initialized Sequelize instance
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");

app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(
  expressSession({
    secret: "keyboard mouse",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to set loggedIn variable
app.use("/", (req, res, next) => {
  res.locals.isLoggedIn = Boolean(req.session.doctorId);
  next();
});

// Middleware to pass flash messages
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.error = req.flash("error");
  next();
});

// Import controllers
const homeController = require("./controllers/home");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const loginController = require("./controllers/login");
const doctorProfileController = require("./controllers/doctorProfile");
const loginDoctorController = require("./controllers/loginDoctor");
const doctorRegisterController = require("./controllers/newDoctor");
const clientRegisterController = require("./controllers/newClient");
const storeDoctorController = require("./controllers/storeDoctor");
const storeClientController = require("./controllers/storeClient");


// Define routes
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/auth/login", loginController);
app.get("/doctorProfile", doctorProfileController);
app.get("/auth/doctorRegister", doctorRegisterController);
app.get("/auth/clientRegister", clientRegisterController);
app.post("/doctor/login", loginDoctorController);
app.post("/doctor/register", storeDoctorController);
app.post("/client/register", storeClientController);

app.use((req, res) => res.render("notFound"));



//This will only start the server as Database Connection is already handled in config/database.js file
app.listen(3100, () => {
  console.log("🚀 Server is running on port 3100");
});