$(function () {
    $('.remove').on('click', function removeContributor(e) {
        e.preventDefault();
        var liElem = $(this).parent(),
            itemId = liElem.data('item-id');
        $.ajax({
            url: '/contributors/'+itemId,
            method: 'DELETE',
            success: function () {
                liElem.remove();
            }
        });
    });
});