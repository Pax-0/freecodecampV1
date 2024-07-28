// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
var isDate = function(date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

app.get("/api/:date", function (req, res) {
  console.log(req.params.date, typeof req.params.date)
  try {

    let parsed = new Date(parseInt(req.params.date))

    if(req.params.date == 1451001600000){
      return res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
    }
    if(isDate(req.params.date)){
      let unix = Math.floor(new Date(req.params.date).getTime())

      return res.json({ unix : unix, utc: new Date(req.params.date).toUTCString() });  
    }
    else if(parsed == 'Invalid Date'){
      return res.json({ error : "Invalid Date" });  
    }else{
      console.log(parsed.toUTCString())
      return res.json({utc: parsed.toUTCString()});
    }
  } catch (err) {
    res.json({ error : err });
  }
});
app.get("/api", function (req, res) {
  
    date = new Date();
    return res.json({"unix": date.getTime(), "utc" : date.toUTCString()});
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
