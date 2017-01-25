/*$('#bookdiv a').click(function(e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#customerDivdiv a').click(function(e) {
  e.preventDefault();
  $(this).tab('show');
});

// store the currently selected tab in the hash value
$("#bookLink").on("shown.bs.tab", function(e) {
  var id = $(e.target).attr("href").substr(1);
  window.location.hash = id;
});
// on load of the page: switch to the currently selected tab
//var hash = window.location.hash;
//$('#bookdiv a[href="' + hash + '"]').tab('show');*/

/*$(document).ready(function() {
    if (location.hash) {
        $("a[href='" + location.hash + "']").tab("show");
    }
    $(document.body).on("click", "a[data-toggle]", function(event) {
        location.hash = this.getAttribute("href");
    });
});
$(window).on("popstate", function() {
    var anchor = location.hash || $("a[data-toggle='tab']").first().attr("href");
    $("a[href='" + anchor + "']").tab("show");
});*/
