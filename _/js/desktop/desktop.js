;(function($) {
    $('.taskbar').taskbar();
    $('.desktop .apps li a').click(function() {
        var icon = 'img',
            img;
        if ($(this).find('i').length && $(this).find('i').length > 0) {
            icon = $(this).find('i').attr('class').match(/(fa-[^\s"]*)/g)[0];
        } else {
            img = $(this).find('img').attr('src');
        }
        var win = $('<div class="window"></div>').appendTo('.wrap-container'),
            appName = $(this).attr('data-name');
        win.window({
            appName: appName,
            icon: icon,
            img: img,
            url: $(this).attr('data-href')
        });
    });
})(jQuery);
