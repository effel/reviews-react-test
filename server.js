const express = require('express');
let fs = require("fs");
let cors = require('cors');
const app = express();
app.use(cors());

function readJsonFileSync(filepath, encoding){
    let file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(){
    let filepath = __dirname + '/json/reviews.json';
    return readJsonFileSync(filepath);
}

app.get('/', function (req, res) {
  const reviews = getConfig();
  res.send("Hello World!")
})

app.get('/reviews', function (req, res) {
  const reviews = getConfig();
  res.send(reviews)
})

app.get('/ratings', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    const reviews = getConfig();
    const yearNow = Date.now();
    const currentYear = new Date(yearNow).getFullYear();
    const elemsQuantity = reviews.length;
    let generalReviewCommon = 0;
    let obj = {};
    
    let travelWithFriends = 0;
    let travelWithFamily = 0;    
    let travelWithOthers = 0;       
    let travelWithSingle = 0;     
    let travelWithCouple = 0;   

    for (let i in reviews[0].ratings.aspects) {
        if (reviews[0].ratings.aspects.hasOwnProperty(i)) {
            obj[i] = 0;
        }
    }

    reviews.forEach(function(element) {
        const dataYear = new Date(element.entryDate).getFullYear();
        const weightValue = (currentYear - dataYear) >= 5 ? 0.5 : (1 - (currentYear - dataYear) * 0.1);
        generalReviewCommon += element.ratings.general.general * weightValue;

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] += element.ratings.aspects[key] * weightValue;
            }
        }
        obj.genRating = generalReviewCommon;
        
        switch (element.traveledWith) {
           case "FAMILY":
            ++travelWithFamily;
            break;
           case "FRIENDS":
            ++travelWithFriends;
            break;    
           case "COUPLE":
            ++travelWithCouple;
            break;         
           case "SINGLE":
            ++travelWithSingle;
            break;     
           case "OTHER":
            ++travelWithOthers;
            break;             
        }
        
    });
    
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let amount = obj[key]/elemsQuantity;
            obj[key] = amount === Math.ceil(amount) ? amount : amount.toFixed(4);
        }
    }

    let objTravelWith = {
        travelWithFamily,
        travelWithFriends,
        travelWithCouple,
        travelWithSingle,
        travelWithOthers
    };
    
    obj = Object.assign({}, obj, objTravelWith);

    res.status(200).send(obj);    

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})