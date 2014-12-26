;(function($) {
    $('.taskbar').taskbar();
    $('.desktop .apps li a').click(function() {
        var win = $('<div class="window"></div>').appendTo('.wrap-container'),
            icon = $(this).find('i').attr('class').match(/(fa-[^\s"]*)/g)[0],
            appName = $(this).attr('data-name');
        win.window({
            appName: appName,
            icon: icon
        });
    });
})(jQuery);
