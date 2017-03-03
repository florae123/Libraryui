
function executeConversation(){

  var lastContext = null;

  var borrowCid;
  var borrowBid;
  var borrowStartDate;
  var borrowEndDate;

  $(document).ready(function() {
        startConv();
  });

  $(document).ready(function() {
    //submit response when button is clicked on
      $('#convSubmit').click(function() {
        say();
      })
    //submit response when enter is pressed inside textarea
      var textArea = document.getElementById("convUserText");
      textArea.onkeyup = function(evt) {
          evt = evt || window.event;

          if (evt.keyCode == 13) {
              say();
          }
      };
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
        console.log(data);
        lastContext = data.context;
        //save data to register rental
        if (data.output.hasOwnProperty('action')) {
          if(data.output.action=='borrow-save-cid') {
            borrowCid = data.input.text;
            console.log('Customer id: '+borrowCid);
          } else if (data.output.action=='borrow-save-start-date') {
            borrowStartDate = saveDate();
            console.log('StartDate: '+borrowStartDate);
          } else if (data.output.action=='borrow-save-end-date') {
            borrowEndDate = saveDate();
            console.log(borrowEndDate);
            borrowBook(borrowBid, borrowCid, borrowStartDate, borrowEndDate);
          }
        }
        function saveDate() {
          if (data.hasOwnProperty('entities')) {
            var i;
            for (i = 0; i < data.entities.length; i++) {
                if(data.entities[i].entity=='sys-date') {
                  return data.entities[0].value;
                }
            }
          }
        }
        //if parameter selected_books specified, search for book by tag and display books
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
        //if parameter books_by_title specified, search for books by title and display id
        //save the book with this title in case of rental
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
              borrowBid = data.output.books_by_title[0].id;
              $('#convText').append(
                '<p style="text-align:right;">'+$('#convUserText').val()+'</p>'
                +'<p style="text-align:left;">'+data.output.text[0]+'<br><strong>'+titledBooks+'</strong>'+
                data.output.text[1]+'</p>'
              );
            }
        // if no other parameter specified, just display the output text
        } else {
          $('#convText').append(
            '<p style="text-align:right;">'+$('#convUserText').val()+'</p>'
            +'<p style="text-align:left;">'+data.output.text+'</p>'
          );
        }
        $('#convUserText').val('');
        controlScroll();
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert('conversation error: '+ textStatus);
      }
    })
  }

  function giveData(){
    var inputText = $('#convUserText').val();
    //conversation service does not accept input text containing line breaks
    inputText = inputText.replace(/(\r\n|\n|\r)/gm,"");
    var input = {"user_input": inputText, "context": lastContext};
    return JSON.stringify(input);
  }

  //end last conversation before starting new Conversation
  function endConv(){

  }

  function borrowBook(borrowBid, borrowCid, borrowStartDate, borrowEndDate){
    addRentalConv(borrowBid, borrowCid, borrowStartDate, borrowEndDate);
  }

  function controlScroll() {
    var elem = document.getElementById('conversationBody');
    elem.scrollTop = elem.scrollHeight;
  }

}
