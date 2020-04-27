var express = require('express');
var app = express();
var mockJson = require('./MOCK_DATA.json');

app.get('/items', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.json(mockJson);
})

app.listen(3000, function () {
  console.log('Server is listening on port 3000!');
});