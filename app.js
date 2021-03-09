const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const ytapi = require('./lib');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.post('/search', function (req, res) {
  if (!req.body.searchstring) {
    response = {
      error: true,
      httpCode: 502,
      message: 'The search parameter is required'
    };
  } else {
    ytapi.search(req.body.searchstring).then(response => {
      res.send(response);
    })
  }
});

app.post('/next', function (req, res) {
  if (!req.body.searchstring) {
    response = {
      error: true,
      httpCode: 502,
      message: 'The search parameter is required'
    };
  } else {
    ytapi.nextpage(req.body.searchstring, req.body.token).then(response => {
      res.send(response);
    })
  }
});

app.post('/previous', function (req, res) {
  if (!req.body.searchstring) {
    response = {
      error: true,
      httpCode: 502,
      message: 'The search parameter is required'
    };
  } else {
    ytapi.previouspage(req.body.searchstring, req.body.token).then(response => {
      res.send(response);
    })
  }
});


app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
