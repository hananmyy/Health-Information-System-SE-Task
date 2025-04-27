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
const logoutController = require("./controllers/logout");
const doctorProfileController = require("./controllers/doctorProfile");
const clientProfileController = require("./controllers/clientProfile");
const loginDoctorController = require("./controllers/loginDoctor");
const doctorRegisterController = require("./controllers/newDoctor");
const clientRegisterController = require("./controllers/newClient");
const storeDoctorController = require("./controllers/storeDoctor");
const storeClientController = require("./controllers/storeClient");
const clientListController = require("./controllers/clientList");
const updateDoctorController = require("./controllers/updateDoctor");
const updateClientController = require("./controllers/updateClient");
const deleteClientController = require("./controllers/deleteClient");
const deleteDoctorController = require("./controllers/deleteDoctor");
const uploadDoctorPictureController = require("./controllers/uploadDoctorPicture");
const uploadClientPictureController = require("./controllers/uploadClientPicture");
const createProgramController = require("./controllers/createProgram");
const deleteProgramController = require("./controllers/deleteProgram");
const viewProgramsController = require("./controllers/viewPrograms");
const manageProgramsController = require("./controllers/managePrograms");
const enrollClientController = require("./controllers/enrollClient");




// Define routes
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/auth/login", loginController);
app.get("/auth/logout", logoutController);
app.get("/doctorProfile", doctorProfileController);
app.get("/client/:id", clientProfileController); // to render client profile page
app.get("/auth/doctorRegister", doctorRegisterController);
app.get("/auth/clientRegister", clientRegisterController);
app.get("/clients", clientListController);
app.get("/programs", manageProgramsController);
app.get("/programs/data", viewProgramsController);
app.get("/api/client/:id", clientProfileController); // API route to expose client data"
app.get("/programs/:id", viewProgramsController); // Route to view a specific program


app.post("/doctor/login", loginDoctorController);
app.post("/doctor/register", storeDoctorController);
app.post("/client/register", storeClientController);
app.post("/doctor/update", updateDoctorController);
app.post("/client/:id/update", updateClientController);// Route for doctors to update a specific client’s profile
app.post("/client/:id/delete", deleteClientController);  // Doctor deletes a client
app.post("/doctor/delete", deleteDoctorController);  // Doctor deletes their own profile
app.post("/doctor/uploadPicture", uploadDoctorPictureController);
app.post("/client/:id/uploadPicture", uploadClientPictureController); 
app.post("/program/create", createProgramController);
app.post("/program/delete/:id", deleteProgramController); 
app.post("/client/:id/enroll", enrollClientController); // Route to enroll a client in programs




app.use((req, res) => res.render("notFound"));



//This will only start the server as Database Connection is already handled in config/database.js file
app.listen(3100, () => {
  console.log("Server is running on port 3100");
});