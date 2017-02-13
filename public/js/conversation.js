var protocol = window.location.protocol;
if(protocol=="file:" || protocol=='http:'){
	console.log("You are in the local files.");
	var rootURL1 = 'http://localhost:9080/myOtherTest/api';
	executeConversation();
} else {
	var myurl = window.location.host;
	console.log("location.host: " +myurl);
	var protocol = window.location.protocol;
	console.log("location.protocol: " +protocol);
	myurl = protocol + '//' + myurl + "/apiuri";
	console.log('The rootURL1 is found at: '+myurl);
		$.ajax({
			type: 'GET',
			url: myurl,
			dataType: 'json', // data type of response
			success: function(data){
				rootURL1 = data.uri;
				console.log('The rootURL1 is: '+rootURL1);
				executeConversation();
			}
		});
}

function executeConversation(){
  var rootURLconv = rootURL1 + "/conversation"
  console.log(rootURLconv);

  var lastContext = null;

  $(document).ready(function() {
      $('#convStart').click(function() {
        startConv();
      })
  });

  $(document).ready(function() {
      $('#convSubmit').click(function() {
        say();
      })
  });

  function startConv(){
    endConv();
    $.ajax({
      type: 'GET',
      url: rootURLconv,
      success: function(data, textStatus, jqXHR){
        lastContext = data.context;
        $('#convText').append(
          '<p style="text-align:left;">'+data.output.text+'</p>'
        );
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert('conversation start error: '+ textStatus);
      }
    })
  }

  //not complete
  function say(){
    $.ajax({
      type: 'PUT',
      contentType: 'application/json',
      url: rootURLconv,
      dataType: 'json',
      data: giveData(),
      success: function(data, textStatus, jqXHR){
        lastContext = data.context;
        if(data.output.hasOwnProperty('selected_books')) {
          var selectedBooks = "";
          var i;
          for(i=0; i<data.output.selected_books.length; i++) {
            selectedBooks = selectedBooks + data.output.selected_books[i].title + '<br>'
          }
          $('#convText').append(
            '<p style="text-align:right;">'+$('#convUserText').val()+'</p>'
            +'<p style="text-align:left;">'+data.output.text+'<br><strong>'+selectedBooks+'</strong></p>'
          );
        } else if (data.output.hasOwnProperty('books_by_title')) {
            if(jQuery.isEmptyObject(data.output.books_by_title)){
              $('#convText').append(
                '<p style="text-align:right;">'+$('#convUserText').val()+'</p>'
                +'<p style="text-align:left;">'+data.output.text+'</p>'
              );
            } else {
              var titledBooks = "";
              var i;
              for(i=0; i<data.output.books_by_title.length; i++) {
                titledBooks = titledBooks + data.output.books_by_title[i].id +'<br>'
              }
              $('#convText').append(
                '<p style="text-align:right;">'+$('#convUserText').val()+'</p>'
                +'<p style="text-align:left;">'+data.output.text+'<br><strong>'+titledBooks+'</strong></p>'
              );
            }
        } else {
          $('#convText').append(
            '<p style="text-align:right;">'+$('#convUserText').val()+'</p>'
            +'<p style="text-align:left;">'+data.output.text+'</p>'
          );
        }
        $('#convUserText').val('');
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert('conversation error: '+ textStatus);
      }
    })
  }

  function giveData(){
    var input = {"user_input": $('#convUserText').val(), "context": lastContext};
    return JSON.stringify(input);
  }

  //end last conversation before starting new Conversation
  function endConv(){

  }



}
