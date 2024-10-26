$(document).ready(function(){

$('#owl-carousel').owlCarousel({
    loop:false,
    margin:5,
    nav:false,
    startPosition: 0,
    center: true,
    autoplay: true,
    dots:false,
    items: 3,

    responsive:{
        0:{
            items:2,
        },
        600:{
            items:2,
        }
    },
    });
    $("#owl-carousel").trigger("to.owl.carousel", [2, 1]);

    $('.image-link').magnificPopup({type:'image'});

    $('.gallery-item').magnificPopup({
        type: 'image',
        gallery:{
          enabled:true
        }
      });

        
});
