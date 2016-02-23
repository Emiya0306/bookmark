function bookmarkConfirm(event) {
    $("#deleteBookmarkID").val($(event.target).siblings(".hidden").val());
}

function confirmDelete(event) {
    $.get("/delete/" + $("#deleteBookmarkID").val(), function() {

    });
}