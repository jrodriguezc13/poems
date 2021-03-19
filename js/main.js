"use strict";

jQuery(document).on('ready', function () {

    jQuery(window).on('scroll', function () {
        animateElement();
    });


    jQuery(".single-portfolio .content-wrapper").first().css("padding-top", 0);

    if (!jQuery(".single-portfolio .nav-next").length)
    {
        jQuery(".single-portfolio .nav-previous").css("padding-bottom", 0);
    }

    //Portfolio
    var grid = jQuery('.grid').imagesLoaded(function () {
        grid.isotope({
            itemSelector: '.grid-item',
            transitionDuration: 0,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        jQuery('.grid-sizer, .grid-item').innerWidth(jQuery(".grid-sizer, .grid-item").innerWidth());
    });

    //Placeholder show/hide
    jQuery('input, textarea').focus(function () {
        jQuery(this).data('placeholder', jQuery(this).attr('placeholder'));
        jQuery(this).attr('placeholder', '');
    });
    jQuery('input, textarea').blur(function () {
        jQuery(this).attr('placeholder', jQuery(this).data('placeholder'));
    });    

    singlePaginationHeightFix();

    //Set menu
    jQuery('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
        markCurrentItem: true
    });

    jQuery(".site-content").fitVids();    
});



jQuery(window).on('load', function () {

    //Image
    jQuery(".image-slider").each(function () {
        var id = jQuery(this).attr('id');

        var auto_value = window[id + '_auto'];
        var hover_pause = window[id + '_hover'];
        var speed_value = window[id + '_speed'];

        auto_value = (auto_value === 'true') ? true : false;
        hover_pause = (hover_pause === 'true') ? true : false;

        jQuery('#' + id).slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 750,
            autoplay: auto_value,
            autoplaySpeed: speed_value,
            pauseOnHover: hover_pause,
            fade: true,
            draggable: false,
            adaptiveHeight: true
        });
    });

    imageGallery();

//PrettyPhoto initial
    jQuery('a[data-rel]').each(function () {
        jQuery(this).attr('rel', jQuery(this).data('rel'));
    });

    jQuery("a[rel^='prettyPhoto']").prettyPhoto({
        slideshow: false, /* false OR interval time in ms */
        overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
        default_width: 1280,
        default_height: 720,
        deeplinking: false,
        social_tools: false,
        iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
    });


    blogLayoutFix();    
    homeLoadMore();
    portfolioLoadMore();
    animateElement();

//Show-Hide header sidebar
    jQuery('#toggle, .menu-wraper').on('click', multiClickFunctionStop);
    jQuery('.main-menu, .search-field').on('click', function (e) {
        e.stopPropagation();
    });


    jQuery('.doc-loader').fadeOut();

});


jQuery(window).on('resize', function () {
    blogLayoutFix();    
    imageGallery();
    jQuery('.grid-sizer, .grid-item').innerWidth("50%");
});

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


var animateElement = function (e) {

    jQuery(".animate").each(function (i) {

        var top_of_object = jQuery(this).offset().top;
        var bottom_of_window = jQuery(window).scrollTop() + jQuery(window).height();
        if ((bottom_of_window) > top_of_object) {
            jQuery(this).addClass('show-it');
        }

    });

};

var homeLoadMore = function (e) {
    jQuery('.more-posts').on("click", function () {
        jQuery('.blog-holder').find(".hidden").slice(0, 4).removeClass("hidden").addClass("animate loaded");
        animateElement();
        if (!jQuery('.blog-holder').find(".hidden").length)
        {
            jQuery('.more-posts').hide();
            jQuery('.no-more-posts').css('display', 'inline-block');
        }
    });
};

var portfolioLoadMore = function (e) {
    jQuery('.more-posts-portfolio').on("click", function () {
        jQuery('#portfolio').find(".hidden").slice(0, 4).removeClass("hidden").addClass("animate loaded");
        jQuery('.grid').isotope();
        jQuery('.grid-sizer, .grid-item').innerWidth(jQuery(".grid-sizer, .grid-item").innerWidth());
        animateElement();
        if (!jQuery('#portfolio').find(".hidden").length)
        {
            jQuery('.more-posts-portfolio').hide();
            jQuery('.no-more-posts-portfolio').css('display', 'inline-block');
        }
    });
};

var blogLayoutFix = function () {

    jQuery('.blog-item-holder.has-post-thumbnail:nth-child(2n)').each(function () {
        var x = jQuery(".blog-holder").width() - jQuery(this).find('.post-thumbnail').width() - (parseFloat(jQuery(this).find('.post-thumbnail').css('max-width')) - jQuery(this).find('.post-thumbnail').width()) / 2;
        jQuery(this).find('.post-thumbnail').css('transform', 'translateX(' + x + 'px)');
        x = jQuery(this).find('.entry-holder').innerWidth() - 87 + jQuery(this).find('.post-thumbnail').width() - x;
        jQuery(this).find('.entry-holder').css('transform', 'translateX(-' + x + 'px)');
    });

};

var multiClickFunctionStop = function (e) {
    if (jQuery(e.target).is('.menu-wraper') || jQuery(e.target).is('.menu-right-part') || jQuery(e.target).is('.menu-holder') || jQuery(e.target).is('#toggle') || jQuery(e.target).is('#toggle div'))
    {

        jQuery('#toggle, .menu-wraper').off("click");
        jQuery('#toggle').toggleClass("on");
        if (jQuery('#toggle').hasClass("on"))
        {
            jQuery('.header-holder').addClass('down');
            jQuery('.menu-wraper, .menu-holder').addClass('show');
            jQuery('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
        } else
        {
            jQuery('.header-holder').removeClass('down');
            jQuery('.menu-wraper, .menu-holder').removeClass('show');
            jQuery('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
        }
    }
};

var singlePaginationHeightFix = function () {
    if (jQuery('.single .nav-previous a').height() > jQuery('.single .nav-next a').height())
    {
        jQuery('.single .nav-next a').height(jQuery('.single .nav-previous a').height());
    } else
    {
        jQuery('.single .nav-previous a').height(jQuery('.single .nav-next a').height());
    }
};

var imageGallery = function () {
    var isMobile = jQuery(window).width() < 750;
    var rowHeight = isMobile ? 120 : 300;
    var imgMargin = isMobile ? 10 : 20;
    var borderVal;

    jQuery('.coco-image-gallery').each(function () {
        var id = jQuery(this).attr('id');

        jQuery(this).find('.prettyPhotoLink').each(function () {
            jQuery(this).attr('data-rel', "prettyPhoto[" + id + "]");
        });

        if (jQuery('#' + id).parents('.full-page-width').length)
        {
            borderVal = -1;
        } else
        {
            borderVal = 0;
        }

        jQuery('#' + id).justifiedGallery({
            rowHeight: rowHeight,
            margins: imgMargin,
            border: borderVal
        });
    });
};

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

var SendMail = function () {

    var emailVal = jQuery('#contact-email').val();

    if (isValidEmailAddress(emailVal)) {
        var params = {
            'action': 'SendMessage',
            'name': jQuery('#name').val(),
            'email': jQuery('#contact-email').val(),
            'subject': jQuery('#subject').val(),
            'message': jQuery('#message').val()
        };
        jQuery.ajax({
            type: "POST",
            url: "php/sendMail.php",
            data: params,
            success: function (response) {
                if (response) {
                    var responseObj = jQuery.parseJSON(response);
                    if (responseObj.ResponseData)
                    {
                        alert(responseObj.ResponseData);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //xhr.status : 404, 303, 501...
                var error = null;
                switch (xhr.status)
                {
                    case "301":
                        error = "Redirection Error!";
                        break;
                    case "307":
                        error = "Error, temporary server redirection!";
                        break;
                    case "400":
                        error = "Bad request!";
                        break;
                    case "404":
                        error = "Page not found!";
                        break;
                    case "500":
                        error = "Server is currently unavailable!";
                        break;
                    default:
                        error = "Unespected error, please try again later.";
                }
                if (error) {
                    alert(error);
                }
            }
        });
    } else
    {
        alert('Your email is not in valid format');
    }
};

function is_touch_device() {
    return !!('ontouchstart' in window);
}