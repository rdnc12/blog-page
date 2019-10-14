// jshint esversion:6

$(document).ready(function () {

    let menuName = $('meta[name="active-menu"]').attr('content');
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
    
    $('.table').after('<div class="pagination justify-content-center" id="nav"></div>');
    var rowsShown = 3;
    var rowsTotal = $('.table tbody tr').length;
    var numPages = rowsTotal / rowsShown;

    for (i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        $('#nav').append('<a class="page-link" href="#" rel="' + i + '">' + pageNum + '</a> ');
    }

    $('.table tbody tr').hide();
    $('.table tbody tr').slice(0, rowsShown).show();
    $('#nav').addClass('mb-1');
    $('#nav a:first').addClass('active');

    $('#nav a').bind('click', function () {

        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('.table tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
            css('display', 'table-row').animate({ opacity: 1 }, 300);
    });

});


//Delete day
// $(document).on('click', '#delete', function () {
//     event.preventDefault();
//     var closeDiv = $(this).closest('div');

//     $(this).fadeOut(500, function () {
//         closeDiv.remove();
//     });
//  });


// Search days
$('#search-topics > input').keyup(function () {
    var searchText = $(this).val().toLowerCase();

    $('#homeContainer > h1').each(function () {
        var currentLiText = $(this).text().toLowerCase();
        showCurrentList = currentLiText.indexOf(searchText) > -1;
        $('#homeContainer').toggle(showCurrentList);
    });
});

//
