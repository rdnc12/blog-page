// jshint esversion:6

$(document).ready(function () {

    let menuName =$('meta[name="active-menu"]').attr('content');
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
