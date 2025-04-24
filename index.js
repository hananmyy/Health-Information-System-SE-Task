const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, "public")));


app.get("/",(req, res) =>{
    res.render("index")
})

app.listen(3100, () => {
    console.log("Server is running on port 3100");
});