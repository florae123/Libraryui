var protocol = window.location.protocol;
if(protocol=="file:" || protocol=='http:'){
	console.log("You are in the local files.");
	var rootURL1 = 'http://localhost:9080/myOtherTest/api';
	executeRental();
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
			//dataType: 'json', // data type of response
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
	showRentals();
});

function showRentals() {
	$('#rentalsTableRows').empty();
	$.ajax({
			url: rootURLrental
	}).then(function(data) {
		$.each( data, function( key, val ) {
			$('#rentalsTableRows').append(
				'<tr> <td>'+val.id+'</td> <td>'+val.bookuri+'</td> <td>'+val.customeruri+'</td> <td class="dateTd">'+val.start+'</td> <td class="dateTd">'+val.end+'</td>'+
				'<td>'+'<p><a class="btn btn-default returnBook" data-toggle="popover" data-placement="left" ><span class="glyphicon glyphicon-remove">'+
				//'<td>'+'<a class="btn btn-default returnBook"><span class="glyphicon glyphicon-send">'+
				'</span></a></p>'+
				'<p><a class="btn btn-default updateRental" data-toggle="popover" data-placement="left">'+
				'<span class="glyphicon glyphicon-pencil"></span></a></p></td>'+
				' </tr>'
			);
			$('[class="btn btn-default returnBook"]').popover({
				html: true,
				trigger: 'click',
				content: function () {
					return '<div class="popoverContent"><p>Return this book?</p>'+
					'<p></p><p><div>'+
					'<button type="button" class="btn btn-default returnCheck">'+
					'<span class="glyphicon glyphicon-ok"></button>'+
					'&nbsp; <button type="button" class="btn btn-default returnNot">'+
					'Cancel</button></div></p></div>';
				}
			});
			$('[class="btn btn-default updateRental"]').popover({
				html: true,
				trigger: 'click',
				content: function () {
					return '<div class="popoverContent">'+
					'<div class="col-sm-offset-2"><strong>Update Rental:</strong></div>'+
					'<form class="form-horizontal">'+
						'<div class="form-group">'+
							'<label class="control-label" for="selBidUpdate">Book ID:</label>'+
							'<select class="form-control rentalInput" id="selBidUpdate"></select>'+
						'</div>'+
						'<div class="form-group">'+
							'<label class="control-label" for="selCidUpdate">Customer ID:</label>'+
							'<select class="form-control rentalInput" id="selCidUpdate"></select>'+
						'</div>'+
						'<div class="form-group">'+
							'<label class="control-label" for="startUpdate">Start Date:</label>'+
							'<input type="text" class="form-control rentalInput" id="startUpdate" placeholder="YYYY-MM-DD">'+
						'</div>'+
							'<div class="form-group">'+
								'<label class="control-label" for="endUpdate">End Date:</label>'+
								'<input type="text" class="form-control rentalInput" id="endUpdate" placeholder="YYYY-MM-DD">'+
							'</div>'+
							'<div class="form-group">'+
								'<button type="button" class="btn btn-default" id="updateRentalbtn">Update</button>'+
								'&nbsp; <button type="button" class="btn btn-default updateNot">'+
								'Cancel</button>'
							'</div>'+
						'</form>'+
						'</div>';
				}
			});
		});
	});
}

function showSelection(customerSel, bookSel) {
	$(customerSel).innerHTML = "";
	$(bookSel).innerHTML = "";
	$('.customerTable tr').each(function (i, row) {
		if(i!=0){
			var $row = $(row);
			var $tempCId = $row[0].children[0].innerHTML;
			$(customerSel).append(
				'<option>'+$tempCId+'</option>'
			);
		}
	});
	$('.bookTable tr').each(function (i, row) {
		if(i!=0){
			var $row = $(row);
			var $tempBId = $row[0].children[0].innerHTML;
			$(bookSel).append(
				'<option>'+$tempBId+'</option>'
			);
		}
	});
}

$(document).on("click", ".addRentalToggle", function(e) {
	//showSelection('#selCid', '#selBid');
	$('#selCid').empty();
	$('#selBid').empty();
	$('.customerTable tr').each(function (i, row) {
		if(i!=0){
			var $row = $(row);
			var $tempCId = $row[0].children[0].innerHTML;
			$('#selCid').append(
				'<option>'+$tempCId+'</option>'
			);
		}
	});
	$('.bookTable tr').each(function (i, row) {
		if(i!=0){
			var $row = $(row);
			var $tempBId = $row[0].children[0].innerHTML;
			$('#selBid').append(
				'<option>'+$tempBId+'</option>'
			);
		}
	});
})

$(document).on("click", ".updateRental", function (e) {
	$('#selCidUpdate').empty();
	$('#selBidUpdate').empty();
	$('.customerTable tr').each(function (i, row) {
		if(i!=0){
			var $row = $(row);
			var $tempCId = $row[0].children[0].innerHTML;
			$('#selCidUpdate').append(
				'<option>'+$tempCId+'</option>'
			);
		}
	});
	$('.bookTable tr').each(function (i, row) {
		if(i!=0){
			var $row = $(row);
			var $tempBId = $row[0].children[0].innerHTML;
			$('#selBidUpdate').append(
				'<option>'+$tempBId+'</option>'
			);
		}
	});
})

$(document).on("click", ".updateNot", function (e) {
	var elem, evt = e ? e:event;
	if (evt.srcElement)  elem = evt.srcElement;
	else if (evt.target) elem = evt.target;

	var parent = elem.parentElement;
	while(!(parent.tagName=='TD')) {
		parent = parent.parentElement;
	}
	$(parent.children[1].children[0]).trigger('click');
})

$(document).on("click", ".returnNot", function (e) {
	var elem, evt = e ? e:event;
	if (evt.srcElement)  elem = evt.srcElement;
	else if (evt.target) elem = evt.target;

	var parent = elem.parentElement;
	while(!(parent.tagName=='TD')) {
		parent = parent.parentElement;
	}
	$(parent.firstChild).trigger('click');
})

$(document).on("click", ".returnCheck", function (e) {
	var elem, evt = e ? e:event;
	if (evt.srcElement)  elem = evt.srcElement;
	else if (evt.target) elem = evt.target;

	var parent = elem.parentElement;
	while(!(parent.tagName=='TR')) {
		parent = parent.parentElement;
	}
	var id = $(parent).find("td:nth-child(1)"); //gets first td of row
	var id = id[0].innerHTML;	//id of rental
	returnBookFromList(id, elem, parent);
})

function returnBookFromList(valueID, element, parent){
	console.log('returnBook');
	$.ajax({
		type: 'DELETE',
		url: rootURLrental + '/' + valueID,
		success: function(data, textStatus, jqXHR){
			//close popover
			var parent1 = element.parentElement;
			while(!(parent1.tagName=='TD')) {
				parent1 = parent1.parentElement;
			}
			$(parent1).trigger('click');
			$(parent).fadeOut(400);
			$.bootstrapGrowl("The borrowed book has been returned ("+valueID+").", {type:'success', delay: 2000});
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('returnBook error: ' + textStatus);
		}
	});
}

$(document).on("click", "#updateRentalbtn", function (e) {
	var elem, evt = e ? e:event;
	if (evt.srcElement)  elem = evt.srcElement;
	else if (evt.target) elem = evt.target;

	var parent = elem.parentElement;
	while(!(parent.tagName=='TR')) {
		parent = parent.parentElement;
	}
	var id = $(parent).find("td:nth-child(1)"); //gets first td of row
	var id = id[0].innerHTML;	//id of rental
	updateRental(id, elem);
})

function updateRental(valueID, element) {
  console.log('updateRental');
  $.ajax({
    type: 'PUT',
    contentType: 'application/json',
    url: rootURLrental +'/'+valueID,
    dataType: 'json',
    data: formToJSONRentalUpdate(valueID),
    success: function(data, textStatus, jqXHR){
			//close popover
			var parent1 = element.parentElement;
			while(!(parent1.tagName=='TD')) {
				parent1 = parent1.parentElement;
			}
			$(parent1).trigger('click');
      showRentals(); //load table
			$.bootstrapGrowl("The rental "+valueID+" has been updated.", {type:'success', delay: 2000});

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert('updateCustomer error: '+ textStatus);
    }
  })
}


$(document).ready(function(){
	$('#deleteAllRentalsbtn').popover({
		html: true,
		trigger: 'click',
		container: 'body',
		content: function () {
			return '<div class="popoverContent">'+
			'<p>Are you sure you want to delete all registered borrowed books?</p>'+
			'<p></p><p><div class="col-sm-offset-3">'+
			'<button type="button" class="btn btn-default removeAllRents">'+
			'<span class="glyphicon glyphicon-ok"></button>'+
			'&nbsp; <button type="button" class="btn btn-default removeNot">'+
			'<span class="glyphicon glyphicon-remove"></button></div></p></div>';
		}
	});
})

$(document).on("click", ".removeNot", function (e) {
	/*var elem, evt = e ? e:event;
	if (evt.srcElement)  elem = evt.srcElement;
	else if (evt.target) elem = evt.target;

	var parent = elem.parentElement;
	while(!(parent.className=='form-group')){
		parent = parent.parentElement;
	}
	var butt = $(parent).find("button")[0];*/
	var butt = document.getElementById('deleteAllRentalsbtn');
	$(butt).trigger('click');
})

$(document).on("click", ".removeAllRents", function (e) {
	deleteAllRents()
})

function deleteAllRents(){
	console.log('deleteAll');
	$.ajax({
		type: 'DELETE',
		url: rootURLrental,
		success: function(data, textStatur, jqXHR){
			//location.reload();
			showRentals();
			$.bootstrapGrowl("All borrowed books have been returned.", {type:'success', delay: 2000});
			var butt = document.getElementById('deleteAllRentalsbtn');
			$(butt).trigger('click');
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

/*function updateRental() {
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
}*/

function addRental() {
	console.log('addRental');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURLrental,
		//dataType: "json",
		data: formToJSONRental(),
		success: function(data, textStatus, jqXHR){
			showRentals();
			$('.rentalInput').val('');
			$.bootstrapGrowl("The rental has been registered.", {type:'success', delay: 2000});
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
		"bookid": $('#selBid').find("option:selected").text(),
		"customerid": $('#selCid').find("option:selected").text(), //$('#rentalcustomerid').val(),
		"start": $('#start').val(),
    "end": $('#end').val(),
		});
}

function formToJSONRentalUpdate(valueID) {
	return JSON.stringify({
		"id": valueID,
		"bookid": $('#selBidUpdate').find("option:selected").text(), //$('#rentalbookidUpdate').val(),
		"customerid": $('#selCidUpdate').find("option:selected").text(), //$('#rentalcustidUpdate').val(),
		"start": $('#startUpdate').val(),
    "end": $('#endUpdate').val(),
		});
}


}