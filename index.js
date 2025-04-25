const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');


app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middlwares
app.use(expressSession({
    secret: 'keyboard mouse',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to set loggedIn variable
app.use("/", (req, res, next) => {
  res.locals.isLoggedIn = Boolean(req.session.userId);
  next();
});

// Middleware to Pass Flash Messages
app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage');
  res.locals.error = req.flash('error');
  // console.log('Flash middleware:', res.locals);
  next();
});

// Import controllers
const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');
const contactController = require('./controllers/contact');
const loginController = require('./controllers/login');
const loginDoctorController = require('./controllers/loginDoctor');
const doctorRegisterController = require('./controllers/newDoctor');
const storeDoctorController = require('./controllers/storeDoctor');


// Define routes
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/auth/login", loginController);
app.get("/auth/doctorRegister", doctorRegisterController);

app.post('/user/login', loginDoctorController);
app.post('/doctor/register', storeDoctorController);

app.use((req,res) => res.render('notFound'))



app.listen(3100, () => {
    console.log("Server is running on port 3100");
});