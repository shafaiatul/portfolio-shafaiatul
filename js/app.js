$(document).foundation();

// Manipulate the Custom Off screen for TheDoctor'sChannel screenshots display
$(document).ready(function() {
    'use strict';
    var tdc_button = $('.client-projects .button.tdc');
    var tdc_screeshots_close_btn = $('.tdc-screenshots .button');
    var tdc_screeshots_layout = $('.tdc-screenshots');

    tdc_button.click(function(event) {
        if(tdc_screeshots_layout.hasClass('hidden')) {
            tdc_screeshots_layout.removeClass('hidden').addClass('visible');
        }
        tdc_screeshots_close_btn.click(function(event) {
            tdc_screeshots_layout.addClass('hidden').removeClass('visible');
        });

    });


});

//Screenshot Modal popin on clicking each image
$(document).ready(function() {
    'use strict';
    var img1 = $('.tdc-screenshots .large-device img');
    var modal_img1 = $('#openingModal1 .image-container');

    var img2 = $('.tdc-screenshots .small-device img');
    var modal_img2 = $('#openingModal2 .image-container');

    img1.click(function(event) {
        var src_path = $(this).attr('src');
        modal_img1.attr('src', src_path);

    });

    img2.click(function(event) {
        var src_path = $(this).attr('src');
        modal_img2.attr('src', src_path);

    });

});


//close the off-canvas on clicking the side menus
$(document).ready(function() {
    'use strict';

    var window_width = $(window).width();
    var off_canvas = $('.off-canvas-wrapper .off-canvas-wrapper-inner');
    var off_canvas_is_open = $('.off-canvas-wrapper .off-canvas-wrapper-inner .off-canvas');
    var remove_is_visible = $('.js-off-canvas-exit');

    var menu = $('.scroll-menu li a');

    if(window_width < 768) {

        menu.click(function(event) {

            setTimeout(function() {
                closeOffcanvas();
            }, 700);

            function closeOffcanvas () {

                if(off_canvas.hasClass('is-off-canvas-open')){
                    off_canvas.removeClass('is-off-canvas-open is-open-left');
                    off_canvas_is_open.removeClass('is-open');
                    remove_is_visible.removeClass('is-visible');
                }
            }
        });
    }

    $(window).resize(function(event) {
        window_width = $(window).width();

        if(window_width < 768) {

            menu.click(function(event) {

                setTimeout(function() {
                    closeOffcanvas();
                }, 700);

                function closeOffcanvas () {

                    if(off_canvas.hasClass('is-off-canvas-open')){
                        off_canvas.removeClass('is-off-canvas-open is-open-left');
                        off_canvas_is_open.removeClass('is-open');
                        remove_is_visible.removeClass('is-visible');
                    }
                }
            });
        }

    });


});
