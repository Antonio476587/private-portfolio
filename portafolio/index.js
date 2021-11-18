const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const https = require("https");

// settings
app.set("port",3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(cors());

// middlewares

// routes
app.use(require("./routes/index")); 

// static files
app.use(express.static(path.join(__dirname, "public")));

// serves listen
app.listen(app.get("port"),()=>{
    console.log("Server on port" , app.get("port"));
})