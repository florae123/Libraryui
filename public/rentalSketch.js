
if(protocol=="file:" || protocol=='http:'){
	console.log("You are in the local files.");
	var rootURL1 = 'http://localhost:9080/JavaRESTAPI/api';
	executeRental();
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
				executeRental();
			}
		});
}

function executeRental(){

  var rootURLrental = rootURL1 + "/rentals";
  console.log(rootURL1);
  console.log(rootURLrental);

$(document).ready(function() {
    $.ajax({
        url: rootURLrental
    }).then(function(data) {
      $.each( data, function( key, val ) {
        $('#rentalsTableRows').append(
          "<tr> <td>"+val.id+"</td> <td>"+val.bookuri+"</td> <td>"+val.customeruri+"</td> <td>"+val.start+"</td> <td>"+val.end+"</td> </tr>"
        );
      });
  });
});

$(document).ready(function() {
	$('#deleteRentalBtn').click(function() {
		deleteRental();
	});
})

function deleteRental(){
	console.log('deleteRental');
	$.ajax({
		type: 'DELETE',
		url: rootURLrental + '/' + $('#deleteRentalId').val(),
		success: function(data, textStatus, jqXHR){
			location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete Rental error: ' + textStatus);
		}
	});
}

$(document).ready(function(){
	$('#deleteAllRentalsbtn').click(function(){
		deleteAll();
	})
})

function deleteAll(){
	console.log('deleteAll');
	$.ajax({
		type: 'DELETE',
		url: rootURLrental,
		success: function(data, textStatur, jqXHR){
			location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete all rentals error: '+ textStatus);
		}
	})
}

$(document).ready(function() {
	$('#addNewrental').click(function() {
		addRental();
	});
})

$(document).ready(function() {
	$('#updateRental').click(function() {
		updateRental();
	});
})

function updateRental() {
  console.log('updateRental');
  $.ajax({
    type: 'PUT',
    contentType: 'application/json',
    url: rootURLrental +'/' + $('#rentalId').val(),
		dataType: "json",
		data: formToJSONRental(),
		success: function(data, textStatus, jqXHR){
			location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateRental error: '+ textStatus);
		}
  });
}

function addRental() {
	console.log('addRental');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURLrental,
		dataType: "json",
		data: formToJSONRental(),
		success: function(data, textStatus, jqXHR){
			location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addRental error: ' + textStatus);
		}
	});
}

// Helper function to serialize all the form fields into a JSON string
function formToJSONRental() {
	return JSON.stringify({
		"id": $('#rentalId').val(),
		"bookid": $('#rentalbookid').val(),
		"customerid": $('#rentalcustomerid').val(),
		"start": $('#start').val(),
    "end": $('#end').val(),
		});
}

}
