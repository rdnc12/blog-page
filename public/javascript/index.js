// jshint esversion:6

$(document).ready(function () {

    let menuName = $('#menus').val();
    console.log(menuName);

    switch (menuName) {
        case 'Home':
            $('#home').addClass('active');
            break;
        case 'About':
            $('#about').addClass('active');
            break;
        case 'Contact':
            $('#contact').addClass('active');
    }
   
});