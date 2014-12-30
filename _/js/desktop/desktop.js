;(function($) {
    $('.taskbar').taskbar();
    $('.desktop .apps li a').click(function() {
        var icon = 'img',
            img,
            side = null,
            appName;
        if ($(this).find('i').length && $(this).find('i').length > 0) {
            icon = $(this).find('i').attr('class').match(/(fa-[^\s"]*)/g)[0];
        } else {
            img = $(this).find('img').attr('src');
        }

        side = $(this).attr('data-side-url');
        Log(side);
        var win = $('<div class="window"></div>').appendTo('.wrap-container');
        appName = $(this).attr('data-name');
        win.window({
            appName: appName,
            icon: icon,
            img: img,
            side: side,
            url: $(this).attr('data-href')
        });
    });
})(jQuery);
