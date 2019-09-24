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
