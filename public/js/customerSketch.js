	//var protocol = window.location.protocol;
/*if(protocol=="file:" || protocol=='http:'){
	console.log("You are in the local files.");
	var rootURL1 = 'http://localhost:9080/myOtherTest/api';
	executeCustomer();
} else {*/
	/*var myurl = window.location.host;
	//console.log("location.host: " +myurl);
	var protocol = window.location.protocol;
	//console.log("location.protocol: " +protocol);
	myurlapi = protocol + '//' + myurl + "/apiuri";
	console.log('The rootURLapi is found at: '+myurlapi);
		$.ajax({
			type: 'GET',
			url: myurlapi,
			dataType: 'json', // data type of response
			success: function(data){
				rootURL1 = data.uri;
				console.log('The rootURL1 is: '+rootURL1);
				executeCustomer();
			}
		});*/
//}

function executeCustomer(){

var rootURLcust = rootURL1 + "/customers";
console.log(rootURL1);
console.log(rootURLcust);

//render table of customers
$(document).ready(function() {
    showCustomers();
});

//load customers
function showCustomers() {
	//$("#table_of_items tr").remove();
	$('#customerTableRows').empty();
	$.ajax({
			url: rootURLcust
	}).then(function(data) {
		$.each( data, function( key, val ) {
			$('#customerTableRows').append(
				"<tr> <td>"+val.id+"</td> <td>"+val.name+"</td>"+
				"<td>"+val.email+"</td> <td>"+val.password+"</td>"+'<td>'
				+'<a class="btn btn-default deleteCust" data-toggle="popover" data-placement="left">'+
				'<span class="glyphicon glyphicon-remove">'+
				'</span></a>'+
				' <a class="btn btn-default updateCust" data-toggle="popover" data-placement="left">'+
				'<span class="glyphicon glyphicon-pencil"></span></a></td>'+
				' </tr>'
			);
			$('[class="btn btn-default deleteCust"]').popover({
				html: true,
				trigger: 'click',
				content: function () {
					return '<div class="popoverContent"><p>Delete this customer?</p>'+
					'<p></p><p><div>'+
					'<button type="button" class="btn btn-default returnCheckCust">'+
					'<span class="glyphicon glyphicon-ok"></button>'+
					'&nbsp; <button type="button" class="btn btn-default returnNotCust">'+
					'Cancel</button></div></p></div>';
				}
			});
			$('[class="btn btn-default updateCust"]').popover({
				html: true,
				trigger: 'click',
				//container: 'body',
				content: function () {
					return '<div class="popoverContent">'+
					'<div class="col-sm-offset-1"><strong>Update Customer:</strong></div>'+
					'<form class="form-horizontal">'+
						'<div class="form-group">'+
							'<label class="control-label" for="nameUpdate">Name:</label>'+
							//'<div class="col-xs-4">'+
								'<input type="text" class="form-control rentalInput" id="nameUpdate" placeholder="Enter Name">'+
							//'</div>'+
						'</div>'+
						'<div class="form-group">'+
							'<label class="control-label" for="emailUpdate">Email:</label>'+
							'<input type="text" class="form-control rentalInput" id="emailUpdate" placeholder="Enter Email">'+
						'</div>'+
						'<div class="form-group">'+
							'<label class="control-label" for="passwordUpdate">Password:</label>'+
							'<input type="text" class="form-control rentalInput" id="passwordUpdate" placeholder="Enter Password">'+
						'</div>'+
						'<div class="form-group">'+
							'<button type="button" class="btn btn-default" id="updateCustbtn">update</button>'+
						'</div>'+
					'</form>'+
					'</div>';
				}
			});
		});
	});
}

$(document).on("click", ".returnNotCust", function (e) {
	var elem, evt = e ? e:event;
	if (evt.srcElement)  elem = evt.srcElement;
	else if (evt.target) elem = evt.target;

	var parent = elem.parentElement;
	while(!(parent.tagName=='TD')) {
		parent = parent.parentElement;
	}
	$(parent.firstChild).trigger('click');
})

$(document).on("click", ".returnCheckCust", function (e) {
	var elem, evt = e ? e:event;
	if (evt.srcElement)  elem = evt.srcElement;
	else if (evt.target) elem = evt.target;

	var parent = elem.parentElement;
	while(!(parent.tagName=='TR')) {
		parent = parent.parentElement;
	}
	var id = $(parent).find("td:nth-child(1)"); //gets first td of row
	var id = id[0].innerHTML;	//id of rental
	deleteCustomer(id, elem, parent);
})

$(document).on("click", "#updateCustbtn", function (e) {
	var elem, evt = e ? e:event;
	if (evt.srcElement)  elem = evt.srcElement;
	else if (evt.target) elem = evt.target;

	var parent = elem.parentElement;
	while(!(parent.tagName=='TR')) {
		parent = parent.parentElement;
	}
	var id = $(parent).find("td:nth-child(1)"); //gets first td of row
	var id = id[0].innerHTML;	//id of rental
	updateCustomer(id, elem);
})

function updateCustomer(valueID, element) {
  console.log('updateCustomer');
  $.ajax({
    type: 'PUT',
    contentType: 'application/json',
    url: rootURLcust +'/'+valueID,
    dataType: 'json',
    data: formToJSONCustomerUpdate(valueID),
    success: function(data, textStatus, jqXHR){
			//close popover
			var parent1 = element.parentElement;
			while(!(parent1.tagName=='TD')) {
				parent1 = parent1.parentElement;
			}
			$(parent1).trigger('click');
      showCustomers(); //load table
			$.bootstrapGrowl("Customer "+valueID+" has benn updated.", {type:'success', delay: 1500});
    },
    error: function(jqXHR, textStatus, errorThrown){
      alert('updateCustomer error: '+ textStatus);
    }
  })
}

function formToJSONCustomerUpdate(valueID) {
	return JSON.stringify({
		"id": valueID,
		"name": $('#nameUpdate').val(),
		"email": $('#emailUpdate').val(),
		"password": $('#passwordUpdate').val(),
		});
}

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
	$('#deleteAllCustomersbtn').popover({
		html: true,
		trigger: 'click',
		container: 'body',
		content: function () {
			return '<div class="popoverContent">'+
			'<p>Are you sure you want to delete all registered customers?</p>'+
			'<p></p><p><div class="col-sm-offset-3">'+
			'<button type="button" class="btn btn-default removeAllCusts">'+
			'<span class="glyphicon glyphicon-ok"></button>'+
			'&nbsp; <button type="button" class="btn btn-default removeCustsNot">'+
			'<span class="glyphicon glyphicon-remove"></button></div></p></div>';
		}
	});
})

$(document).on("click", ".removeCustsNot", function (e) {
	var butt = document.getElementById('deleteAllCustomersbtn');
	$(butt).trigger('click');
})

$(document).on("click", ".removeAllCusts", function (e) {
	deleteAllCustomers(e);
})

function deleteAllCustomers(){
	console.log('deleteAllCustomers');
	$.ajax({
		type: 'DELETE',
		url: rootURLcust,
		success: function(data, textStatus, jqXHR){
			$.bootstrapGrowl("All customers have been deleted.", {type:'success', delay: 2000});
			showCustomers();
			var butt = document.getElementById('deleteAllCustomersbtn');
			$(butt).trigger('click');
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
		data: formToJSONCustomer(),
		success: function(data, textStatus, jqXHR){
			showCustomers();
			$('.custInput').val('');
			$.bootstrapGrowl("The customer has been registered.", {type:'success', delay: 2000});
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addCustomer error: ' + textStatus);
		}
	});
}

/*function updateCustomer() {
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
}*/

// Helper function to serialize all the form fields into a JSON string
function formToJSONCustomer() {
	return JSON.stringify({
		"name": $('#cName').val(),
		"email": $('#cEmail').val(),
		"password": $('#cPassword').val(),
		});
}

function deleteCustomer(valueID, element, parent){
	console.log('deleteCustomer');
	$.ajax({
		type: 'DELETE',
		url: rootURLcust + '/' + valueID,
		success: function(data, textStatus, jqXHR){
			//close popover
			var parent1 = element.parentElement;
			while(!(parent1.tagName=='TD')) {
				parent1 = parent1.parentElement;
			}
			$(parent1).trigger('click');
			$(parent).fadeOut(400);
			$.bootstrapGrowl("Customer "+valueID+" has been deleted.", {type:'success', delay: 2000});
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete Customer error: ' + textStatus);
		}
	});
}

}
