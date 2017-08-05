var express = require('express');
var app = express();

app.get('/', (req, res) => {
	console.log(__dirname);
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
