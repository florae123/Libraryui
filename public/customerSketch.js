$.ajax({
	type: 'GET',
	url: myurl,
	dataType: 'json', // data type of response
	success: function(data){
	rootURL1 = data.uri;
var rootURLcust = rootURL1 + "/customers";
console.log(rootURL1);
console.log(rootURLcust);


$(document).ready(function() {
    $.ajax({
        url: rootURLcust
    }).then(function(data) {
      $.each( data, function( key, val ) {
        $('.customerTable').append(
          "<tr> <td>"+val.id+"</td> <td>"+val.name+"</td> <td>"+val.email+"</td> <td>"+val.password+"</td> </tr>"
        );
      });
  });
});

$(document).ready(function() {
	$('#deleteBtnC').click(function() {
		deleteCustomer();
	});
})

$(document).ready(function() {
	$('#addNewCustomer').click(function() {
		addCustomer();
	});
})

$(document).ready(function() {
	$('#updateCustomer').click(function() {
		updateCustomer();
	});
})

$(document).ready(function(){
	$('#deleteAllCustomersbtn').click(function(){
		deleteAllCustomers();
	})
})

function deleteAllCustomers(){
	console.log('deleteAllCustomers');
	$.ajax({
		type: 'DELETE',
		url: rootURLcust,
		success: function(data, textStatur, jqXHR){
			location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete all customers error: '+ textStatus);
		}
	})
}

function addCustomer() {
	console.log('addCustomer');
  var json123 = formToJSONCustomer();
  console.log(json123);
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURLcust,
		dataType: "json",
		data: formToJSONCustomer(),
		success: function(data, textStatus, jqXHR){
			location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addCustomer error: ' + textStatus);
		}
	});
}

function updateCustomer() {
  console.log('updateCustomer');
  $.ajax({
    type: 'PUT',
    contentType: 'application/json',
    url: rootURLcust +'/'+$('#cId').val(),
    dataType: 'json',
    data: formToJSONCustomer(),
    success: function(data, textStatus, jqXHR){
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown){
      alert('updateCustomer error: '+ textStatus);
    }
  })
}

// Helper function to serialize all the form fields into a JSON string
function formToJSONCustomer() {
	return JSON.stringify({
		"id": $('#cId').val(),
		"name": $('#cName').val(),
		"email": $('#cEmail').val(),
		"password": $('#cPassword').val(),
		});
}

function deleteCustomer(){
	console.log('deleteCustomer');
	$.ajax({
		type: 'DELETE',
		url: rootURLcust + '/' + $('#deleteCustId').val(),
		success: function(data, textStatus, jqXHR){
			/*location.reload();
      $(document).ready(function() {
        $('#bookdiv').hide();
        $('#customerDiv').show();
        $('#rentalsDiv').hide();
        $('#homeDiv').hide();
      })*/
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete Customer error: ' + textStatus);
		}
	});
}

}
});
