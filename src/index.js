var express = require('express');
var sql = require("mssql");
var config = require('./config/sqlConfig.js')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var reviews;

function setReviews(dummyReviews) {
    reviews = dummyReviews;

    for(var i = 0; i <= reviews.recordset[0].length; i++){
        console.log("The review is: " + reviews[i]);
    };
};

function loadEmployees() {
    sql.connect(config, function (err) {   
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select * from dbo.Reviews', function (err, result) {
            
            if (err){
                console.log(err)   
            }
            setReviews(result.recordset);
        });
    });
};


loadEmployees();

app.get('/reviews', function (req, res) {
    sql.connect(config, function (err) {   
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select * from dbo.Reviews', function (err, result) {
            
            if (err){
                console.log(err)   
            }
            res.json(result.recordset);
            
        });
    });
});

// app.get('/GetSpecificReview/:name', function(req, res){
//     sql.connect(config, function(err){
//         if(err) console.log(err);
//         var request = new sql.Request();
//         request.query('Select * from dbo.Reviews where WhiskeyName = ' + '\'' + req.params.name + '\';', function(err, result){
//             if(err) console.log(err);
//             res.send(result.recordset);
//         })
//     })
// })


var server = app.listen(5000, function () {
    console.log('Server is running..');
});

// module.export = { reviews };


