;(function($, window, document, undefined) {

    var debug = true,
        // constructor
        win = function(ele, opt) {

        // default options
        this.defaults = {
            debug: true,
            appName: 'application',
            icon: 'fa-file-o',
            control: ['close', 'max', 'min'],
            confirm: null, // confirm function
            toolBar: null, // toolBar content
            menuBar: null,
            content: null,
            statueBar: null,
            position: {
                x: 20 + 'px',
                y: 20 + 'px'
            },
            size: {
                width: '600px',
                height: '400px'
            }
        };

        var options = $.extend({}, this.defaults, opt);
        // iterate and reformat each matched element
        return ele.each(function() {
            $this = $(this);
            createHTML($this, options);
        });
    };

    // private functions
    function log(msg) {
        if (debug) {
            if (window.console && window.console.log) {
                window.console.log('%c window log msg: ', 'background: #e4e4e4; color: #2196F3; font-size: 18px;');
                window.console.log(msg);
            }
        }
    }


    function createHTML(obj, options) {
        var childHTML = '<div class="title-bar"><ul class="win-ctrl">';
        options.control.indexOf('close') > -1 ? childHTML += '<li><a class="close"><i></i></a></li>' : null;
        options.control.indexOf('max') > -1 ? childHTML += '<li><a class="max"><i></i></a></li>' : null;
        options.control.indexOf('min') > -1 ? childHTML += '<li><a class="min"><i></i></a></li>' : null;
        childHTML += '</ul>';

        log(childHTML);
    }



    // public function
    win.prototype = {
        min: function() {

        },
        max: function() {

        },
        close: function() {

        }
    };

    $.fn.window = function(options) {
        return new win(this, options);
    }
})(jQuery, window, document);

/*

var winList = [],
    taskList = [],
    windowElement = '<div class="title-bar">' +
        '<div class="app-info"><i></i></div>' +
        '<ul class="win-ctrl">' +
        '<li><a class="close"><i></i></a></li>' +
        '<li><a class="max"><i></i></a></li>' +
        '<li><a class="min"><i></i></a></li>' +
        '</ul></div>' +
        '<div class="menu-bar"></div>' +
        '<div class="tool-bar"></div>' +
        '<div class="content"></div>' +
        '<div class="status-bar"></div>';

*/
/**
 * window control event
 *//*

(function($) {
    $('body').on('mouseup', function() {
        $('body').unbind('mousemove');
    });
})(jQuery);

// bind events for a new window
function bindWindowEvents(ele) {
    // movement event
    ele.find('.title-bar').on('mousedown', windowMove);
    // z-index event
    ele.on('mousedown', windowZIndex);
    // ctrl menu events
    windowCtrl(ele);
}
function Window() {
    */
/**
     * Handle window movement
     * @param event
     *//*

    windowMove function(event) {
        event.preventDefault();
        var win = $(event.currentTarget).parents('.window');
        var startX = event.pageX - win.position().left;
        var startY = event.pageY - win.position().top;
        $('body').bind('mousemove', function(e) {
            e.preventDefault();
            win.css({
                left: e.pageX - startX + 'px',
                top: e.pageY - startY + 'px'
            });
        });
    },

    */
/**
     * Handle window z-index
     *//*

    windowZIndex: function() {
        var i = winList.indexOf($(this).toArray()[0]);
        if (i == -1) {
            // don't exist
            winList.push($(this).toArray()[0]);
        } else {
            // do exist
            winList.splice(i, 1);
            winList.push($(this).toArray()[0]);
        }

        $(winList).each(function(index) {
            $(this).css({
                'z-index': index
            });
        });
    },

    windowCtrl: function(ele) {
        // add window to taskbar.
        $(ele).find('.close').click(function() {
            $(this).parents('.window').hide('fast');
        });
        $(ele).find('.max').click(function() {
            // position info
            var win = $(this).parents('.window'),
                posInfo,
                width,
                height,
                x,
                y;
            if (win.data('maxed')) {
                // already maxed
                posInfo = win.data('posInfo');
                width = posInfo.width;
                height = posInfo.height;
                x = posInfo.x;
                y = posInfo.y;
                win.data('maxed', false);
            } else {
                // haven't maxed
                posInfo = {
                    width: win.width(),
                    height: win.height(),
                    x: win.position().left,
                    y: win.position().top
                };
                win.data('posInfo', posInfo);
                width = '100%';
                height = $('.main-container').height() - 56 + 'px';
                x = '0';
                y = '0';
                win.data('maxed', true);
            }
            $(this).parents('.window').animate({
                width: width,
                height: height,
                left: x,
                top: y
            }, 300);
        });
    }

};


function createWindow(appName, icon) {
    var ele = $('<div/>', { class: 'window' });
    ele.hide();
    ele.appendTo('.main-container');
    ele.append(windowElement);
    // ele.find('.content').append('<iframe src="http://www.baidu.com" frameborder="0"></iframe>');
    bindWindowEvents(ele);
    ele.show(300);
    winList.push($(ele).toArray()[0]);
}
*/
