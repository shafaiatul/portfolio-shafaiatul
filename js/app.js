$(document).foundation();

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
