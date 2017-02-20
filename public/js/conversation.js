
function executeConversation(){

  var lastContext = null;

  $(document).ready(function() {
        startConv();
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
      url: rootURLstartConv,
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
      url: rootURLconChat,//rootURLconv,
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
