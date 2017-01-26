var express = require('express');
var app = express();
var libraryURI = (process.env.LIBRARY_URI || 'http://localhost:9080/myOtherTest/api');
console.log("The Library URI is: " + libraryURI);
// New call to compress content
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 3000);

app.get('/apiuri', function(req, res) {
    res.json({ uri: libraryURI });
});
