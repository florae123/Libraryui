/* Hello, World! program in node.js */
console.log("Hello, World!")

var http = require("http");

var watson = require("watson-developer-cloud");
var conversation = watson.conversation({
  username: '3e1a82d7-cc32-4ddb-9ec9-fda20b7bd68a',
  password: 'QvWCqU2Wxhym',
  version: 'v1',
  version_date: '2016-09-20'
});
// Replace with the context obtained from the initial request
var context = {};
conversation.message({
  workspace_id: '33ffd4ea-46dc-44ca-9779-4ae8b30ee845',
  input: {'text': 'Turn on the lights'},
  context: context
},  function(err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});


http.createServer(function (request, response) {

   // Send the HTTP header
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});

   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
