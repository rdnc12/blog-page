// jshint esversion:6

$(document).ready(function () {

    let menuName =$('meta[name="active-menu"]').attr('content');
    console.log(menuName);

    switch (menuName) {
        case 'home':
            $('#home').addClass('active');
            break;
        case 'about':
            $('#about').addClass('active');
            break;
        case 'contact':
            $('#contact').addClass('active');
            break;
        case 'login':
            $('#login').addClass('active');
    }
   
});


//Delete day
$(document).on('click', '#delete', function () {
    event.preventDefault();
    var closeDiv = $(this).closest('div');

    $(this).fadeOut(500, function () {
        closeDiv.remove();
    });
 });



$('#search-topics > input').keyup(function () {
    var searchText = $(this).val().toLowerCase();

    $('#homeContainer > h1').each(function () {
        var currentLiText = $(this).text().toLowerCase();
        showCurrentList = currentLiText.indexOf(searchText) > -1;
        $('#homeContainer').toggle(showCurrentList);
    });
});
