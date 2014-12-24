/**
 * handle window z-index
 */
(function() {
    // window list
    var winList = $('.window');
    $('.window').on('click', function() {
        
    });
})();

/**
 * window movement
 */
(function() {
    var startX = 0,
        startY = 0;
    $('.window .title-bar').on('mousedown', function(event) {
        event.preventDefault();
        var win = $(this).parents('.window');
        startX = event.pageX - win.position().left;
        startY = event.pageY - win.position().top;
        $('body').bind('mousemove', function(e) {
            e.preventDefault();
            win.css({
                left: e.pageX - startX + 'px',
                top: e.pageY - startY + 'px'
            });
        });
    });

    $('body').on('mouseup', function() {
        $('body').unbind('mousemove');
    });

})();
