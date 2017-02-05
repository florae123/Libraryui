
//var watson = require('watson-developer-cloud');

$(document).ready(function() {
	$('#convTry').click(function() {
		executeConv();
	});
})


function executeConv(){
  var watson = require('watson-developer-cloud');

	/*require(['watson-developer-cloud'], function (watson) {
    //foo is now loaded.
		console.log(arguments.length);
		var conversation = arguments.conversation({
			username: '3e1a82d7-cc32-4ddb-9ec9-fda20b7bd68a',
			password: 'QvWCqU2Wxhym',
			version: 'v1',
			version_date: '2016-09-20'
		})

	});*/


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

}
