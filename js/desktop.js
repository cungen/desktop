(function($) {
    $('.desktop .apps li a').click(function() {
        var ele = $('<div/>', {
            class: 'window'
        }).appendTo('.wrap-container');
        ele.window();
    });
})(jQuery);
