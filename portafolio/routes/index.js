const express = require("express");
const router = express.Router();
const anime = require('animejs');

router.get("/", (req, res, next)=>{
    res.render("index.html",{title : "elix Antonio Cabello Portfolio/CVonline"});
});

router.get("/about", (req, res, next)=>{
    res.render("/about");
});

router.get("/works", (req, res, next)=>{
    res.render("about:blank","Pronto estarán ahí");
});

router.get("/contact", (req, res, next)=>{
    res.render("/index.html/#Contact");
});
module.exports = router;