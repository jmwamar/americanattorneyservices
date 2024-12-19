(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 5000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    $('.course-item').on('click',function(){
        var value = $(this).data('value');
        if(value!=''){
            $('#urgency').val(value);
            $('#first_name').focus();
        }
    });

    $('#btnsubmitquote').on('click',function(){
        var error = 0;
        if($('#first_name').val() == ''){error = 1;}
        if($('#txtemail').val() == ''){error = 1;}
        if($('#txtprio option:selected').val() == ''){error = 1;}
        if($('#txtcity').val() == ''){error = 1;}


        if(error == 0){
            var form = $('#formquote').serialize();
            $.ajax({
                type: 'POST',
                url: './sendmail.php',
                data: form,
                success: function(data) {
                   alert(data);
                   $('#formmsg')[0].reset();
                },
                error: function(xhr, status, error) {
                  alert('Error on Sending');
                }
            });    
        }else{
            alert('Please fill the required fields!')
        }
    });
    $('#sendmsg').on('click',function(){
        var error = 0;
        if($('#name2').val() == ''){error = 1;}
        if($('#email2').val() == ''){error = 1;} 
        if($('#subject').val() == ''){error = 1;}
        if($('#message').val() == ''){error = 1;}


        if(error == 0){
            var form = $('#formmsg').serialize();
            $.ajax({
                type: 'POST',
                url: './sendmail2.php',
                data: form,
                success: function(data) {
                   alert(data);
                   $('#formmsg')[0].reset();
                },
                error: function(xhr, status, error) {
                  alert('Error on Sending');
                }
            });    
        }else{
            alert('Please fill the required fields!')
        }
    });
    
})(jQuery);

