$(document).ready(function() {
	$('#homeLink').click(function() {
    $('#bookdiv').hide();
    $('#customerDiv').hide();
    $('#rentalsDiv').hide();
    $('#homeDiv').show();
	});
})

$(document).ready(function() {
	$('#custlink').click(function() {
    $('#bookdiv').hide();
    $('#customerDiv').show();
    $('#rentalsDiv').hide();
    $('#homeDiv').hide();
	});
})

$(document).ready(function() {
	$('#bookLink').click(function() {
    $('#bookdiv').show();
    $('#customerDiv').hide();
    $('#rentalsDiv').hide();
    $('#homeDiv').hide();
	});
})

$(document).ready(function() {
	$('#rentalsLink').click(function() {
    $('#bookdiv').hide();
    $('#customerDiv').hide();
    $('#rentalsDiv').show();
    $('#homeDiv').hide();
	});
})
