var express = require('express');
var cors = require('cors');
var app = express();
var request = require('request');
var watson = require('watson-developer-cloud');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json



app.use(cors());


var vcapServices;
if(!process.env.VCAP_SERVICES){
      //vcapServices = require('.env');
      var path = require('path');
      vcapServices = require( path.resolve( __dirname, "./env.json" ) );
      //console.log(vcapServices);
}
else {
  vcapServices = JSON.parse(process.env.VCAP_SERVICES);
}
//console.log(vcapServices);

var libraryURI = (process.env.LIBRARY_URI || 'http://localhost:9080/library-server-java/api');
console.log("The Library URI is: " + libraryURI);
// New call to compress content
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 3000);

//java server
app.get('/apiuri', function(req, res) {
    res.json({ uri: libraryURI });
});

//authenticate conversation service
var workspace_id_copy = '1205822a-1615-4d21-9f0b-b0cac7c3ae82';
//my other workspace id: '90ce6c55-d9b1-4688-bd7a-195d2b439bd6';
var conversation = watson.conversation({
  username: vcapServices.conversation[0].credentials.username,
  password: vcapServices.conversation[0].credentials.password,
  path: { workspace_id: workspace_id_copy },
  version: 'v1',
  //version_date: '2016-09-20'
  version_date: '2017-02-03'
});

//authorization token text to speech
app.get('/gettoken', function(req, res) {
   // read from VCAP services
   var tts_username = vcapServices.text_to_speech[0].credentials.username;
   var tts_password = vcapServices.text_to_speech[0].credentials.password;

   var buffer = Buffer.from(tts_username + ':' + tts_password);
   var authstring = 'Basic ' + buffer.toString('base64');
   //console.log("authstring: "+authstring);
   auth_url = "https://stream.watsonplatform.net/authorization/api/v1/token"; //(https://stream.watsonplatform.net/authorization/api/v1/token')
   tts_url = "https://stream.watsonplatform.net/text-to-speech/api";
   //tts_url = "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize" //(https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize')
   var options = {
                  url: auth_url + '?url=' + tts_url,
                  headers: {
                      'Authorization': authstring
                  }
   };
   request(options,function(err,response,body){
      //console.log(body);
      if(!err){
        res.send(body);
      }
      else {
        res.status(500).send('Something broke!');
      }
   });
});

//conversation
//conversation start
app.get('/startConv', function(req, res) {
  conversation.message({}, function(err, data){
    if(err) {
      console.error(err);
      return;
    }
    //console.log("get try: "+JSON.stringify(data.output));
    res.json(data);
  });

});


app.put('/say', function(req, res) {
  conversation.message({
      input: { text: req.body.user_input},
      // Send back the context to maintain state.
      context : req.body.context,
  }, function(err, data){
    if(err) {
      console.error(err);
      return;
    }
    //get context from conversation.js, no need to save context here
    //change answer text if action and book collection is empty


    //console.log(req.body);
    //console.log('req user input: '+req.body.user_input);

    if (data.output.hasOwnProperty('action')) {
      if (data.output.action == 'search_title') {
        var title = data.output.action_param;
        //get books request
        request(libraryURI+'/books/title/'+title, function (error, response, body) {
          if (error) {
            console.error(error);
          }
          if (!error && response.statusCode == 200) {
            data.output.books_by_title = JSON.parse(body);
            //console.log('data before sending: '+JSON.stringify(data.output));
            res.json(data);
            return;
          }
        })

      } else if (data.output.action == 'select_books' && data.output.hasOwnProperty('action_param')) {
        //get selected books ajax call
        var tag = data.output.action_param;
        request(libraryURI+'/books/tag-search/'+tag, function (error, response, body) {
          if (error) {
            console.error(error);
          }
          if (!error && response.statusCode == 200) {
            data.output.selected_books = JSON.parse(body);
            //console.log('data before sending: '+JSON.stringify(data.output));
            res.json(data);
            return;
          }
        })
      } else {
        res.json(data);
      }
    } else {
      res.json(data);
    }

  });
});
