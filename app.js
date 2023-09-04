const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require('request');
const dotenv = require('dotenv');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
require("dotenv").config();


app.get("/", function(req, res){

    res.render("index", {weatherdata: null, error: null});
});



 app.post("/", function(req, res){
    var city = req.body.city;
    const weatherApiUrl = process.env.WEATHER_API_URL;
    const apiKey = process.env.API_KEY;
    const url = `${weatherApiUrl}?q=${city}&appid=${apiKey}`;
    
    // Now use the 'url' variable in your API request
    
    request(url, function(err, response, body){
      if(err){
        res.render('index', {weatherdata: null, error: 'Error, Please try Again'});
      }else{
        let weatherdata =  JSON.parse(body)
        if(weatherdata.main == undefined){
          res.render('index', {weatherdata: null, error: 'Error, Please try again'});

        }else{
          let weatherText = `It's ${weatherdata.main.temp} degrees F in ${weatherdata.name}!`;
          res.render('index', {weatherdata: weatherText,  error: null});
        }
      }
    });
   });



app.listen(3000, function(){

    console.log("Server is running at 3000");
});