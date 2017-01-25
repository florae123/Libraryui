if(protocol=="file:" || protocol=='http:'){
	console.log("You are in the local files.");
	var rootURL1 = 'http://localhost:9080/JavaRESTAPI/api';
	execute();
} else {
	var myurl = protocol + '//' + myurl + "/apiuri";
	console.log('The rootURL1 is found at: '+myurl);
		$.ajax({
			type: 'GET',
			url: myurl,
			dataType: 'json', // data type of response
			success: function(data){
				rootURL1 = data.uri;
				console.log('The rootURL1 is: '+rootURL1);
				execute();
			}
		});
}


function execute(){

var rootURLbooks = rootURL1 + "/books";
console.log(rootURL1);
console.log(rootURLbooks);




$(document).ready(function() {
	$('#addNewBook').click(function() {
		addBook();
    //location.reload();
	});
})

$(document).ready(function() {
	$('#updateBook').click(function() {
		updateBook();
    //location.reload();
	});
})

$(document).ready(function() {
    $.ajax({
        url: rootURLbooks
    }).then(function(data) {
      $.each( data, function( key, val ) {
      //do something with data
        $('#bookTableRows').append(
          "<tr> <td>"+val.id+"</td> <td>"+val.title+"</td> <td>"+val.author+"</td> <td>"+val.isbn+"</td> </tr>"
        );
      });
  });
});

$(document).ready(function() {
	$('#deleteButton').click(function() {
		deleteBook();
	});
})

function deleteBook(){
	console.log('deleteBook');
	$.ajax({
		type: 'DELETE',
		url: rootURLbooks + '/' + $('#deleteId').val(),
		success: function(data, textStatus, jqXHR){
			//location.reload( showBooksOnly());
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete Book error: ' + textStatus);
		}
	});
}

$(document).ready(function(){
	$('#deleteAllbtn').click(function(){
		deleteAll();
	})
})

function deleteAll(){
	console.log('deleteAll');
	$.ajax({
		type: 'DELETE',
		url: rootURLbooks,
		success: function(data, textStatur, jqXHR){
			location.reload();
			$(document).ready(function() {
				//showBooksOnly();
			});
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete all books error: '+ textStatus);
		}
	})
}

function updateBook(){
	console.log('updateBook');
	$.ajax({
		type:'PUT',
		contentType: 'application/json',
		url: rootURLbooks +'/' + $('#id').val(),
		dataType: "json",
		data: formToJSONBook(),
		success: function(data, textStatus, jqXHR){
			location.reload();
			$(document).ready(function() {
				//showBooksOnly();
			});
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('update Book error: '+ textStatus);
		}
	})
}

function addBook() {
	console.log('addBook');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURLbooks,
		dataType: "json",
		data: formToJSONBook(),
		success: function(data, textStatus, jqXHR){
			location.reload();
			$(document).ready(function() {
				//showBooksOnly();
			});
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('add Book error: ' + textStatus);
		}
	});
}

// Helper function to serialize all the form fields into a JSON string
function formToJSONBook() {
	return JSON.stringify({
		"id": $('#id').val(),
		"title": $('#title').val(),
		"author": $('#author').val(),
		"isbn": $('#isbn').val(),
		});
}


function findAll() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURLbooks,
		dataType: "json", // data type of response
		success: renderList
	});
}

function renderList(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	$.each(list, function(index, value) {
		$('#bookTableRows').append("<tr> <td>"+value.id+"</td> <td>"+value.title+"</td> <td>"+value.author+"</td> <td>"+value.isbn+"</td> </tr>");
	});
}

}
