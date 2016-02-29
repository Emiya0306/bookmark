function bookmarkConfirm(event) {
    $("#deleteBookmarkID").val($(event.target).siblings(".hidden").val());
}

function confirmDelete(event) {
    //$.get("/bookmarks/" + $("#deleteBookmarkID").val(), function() {
    //
    //});
  $.ajax({
    url: "/bookmarks/" + $("#deleteBookmarkID").val(),
    type: 'DELETE'
  })
}
