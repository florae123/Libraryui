var myurl = window.location.host;
var protocol = window.location.protocol;
myurlapi = protocol + '//' + myurl + "/apiuri";
console.log('The rootURLapi is found at: '+myurlapi);
  $.ajax({
    type: 'GET',
    url: myurlapi,
    dataType: 'json', // data type of response
    success: function(data){
      rootURL1 = data.uri;
      console.log('The rootURL1 is: '+rootURL1);
      execute();
      executeRental();
      executeCustomer();
      executeConversation();
    }
  });
var rootURLspeechNode = protocol + '//' + myurl + "/gettoken";
console.log('url tts token: '+rootURLspeechNode);
var rootURLstartConv = protocol + '//' + myurl + "/startConv";
var rootURLconChat = protocol + '//' + myurl + "/say";
console.log('url conv start: '+rootURLstartConv);
