;(function($, window, document, undefined) {

    var winList = [];

    function createHTML(options) {
        var childHTML = '<div class="title-bar"><ul class="win-ctrl">';
        options.control.indexOf('close') > -1 ? childHTML += '<li><a class="close"><i></i></a></li>' : null;
        options.control.indexOf('max') > -1 ? childHTML += '<li><a class="max"><i></i></a></li>' : null;
        options.control.indexOf('min') > -1 ? childHTML += '<li><a class="min"><i></i></a></li>' : null;
        childHTML += '</ul></div>';
        childHTML += '<div class="tool-bar">' + (options.toolBar ? options.toolBar : '') + '</div>';
        childHTML += '<div class="menu-bar">' + (options.menuBar ? options.menuBar : '') + '</div>';
        childHTML += '<div class="content">' + (options.content ? options.content : '') + '</div>';
        childHTML += '<div class="status-bar">' + (options.statusBar ? options.statusBar : '') + '</div>';
        return childHTML;
    }

    var methods = {
        init: function(options) {

            // default options
            var settings = $.extend({
                debug: true,
                appName: 'application',
                icon: 'fa-file-o',
                control: ['close', 'max', 'min'],
                confirm: '', // confirm function
                toolBar: '', // toolBar content
                menuBar: '',
                content: '',
                statusBar: '',
                position: {
                    x: 20 + 'px',
                    y: 20 + 'px'
                },
                size: {
                    width: '600px',
                    height: '400px'
                }
            }, options);

            $('body').on('mouseup', function() {
                $('body').unbind('mousemove');
            });

            return this.each(function() {
                var $this = $(this);
                $this.hide();
                $this.append(createHTML(settings));
                // init window data
                if (!$this.data('window')) {
                    $this.data('window', {
                        appName: settings.appName,
                        icon: settings.icon
                    });
                }
                // init position info
                $this.css({
                    width: settings.size.width,
                    height: settings.size.height,
                    top: settings.position.y,
                    left: settings.position.x
                });
                $this.show(300);
                // add to window list
                winList.push($this.toArray()[0]);
                // add to the task bar
                $('.taskbar').taskbar('addWindow', $this);

                // movement event
                $this.find('.title-bar').on('mousedown', function(event) {
                    event.preventDefault();
                    var startX = event.pageX - $this.position().left;
                    var startY = event.pageY - $this.position().top;
                    $('body').bind('mousemove', function(e) {
                        e.preventDefault();
                        $this.css({
                            left: e.pageX - startX + 'px',
                            top: e.pageY - startY + 'px'
                        });
                    });
                });

                // z-index event
                $this.on('mousedown', function() {
                    $('.taskbar').taskbar('active', $this);
                    methods.active($this);
                });

                // ctrl menu events
                $this.find('.close').click(function() {
                    methods.close($this);
                });

                $this.find('.max').click(function() {
                    methods.max($this);
                });

                $this.find('.min').click(function() {
                    methods.min($this);
                });
            });
        },

        // active the window
        active: function($this) {
            var winObj = $this ? $this : this;
            var i = winList.indexOf(winObj.toArray()[0]);
            if (i == -1) {
                // don't exist
                winList.push(winObj.toArray()[0]);
            } else {
                // do exist
                winList.splice(i, 1);
                winList.push(winObj.toArray()[0]);
            }

            $(winList).each(function(index) {
                $(this).css({
                    'z-index': index
                });
            });
        },

        max: function($this) {
            var winObj = $this ? $this : this;
            // position info
            var posInfo,
                width,
                height,
                x,
                y,
                windowData = winObj.data('window');
            if (windowData.maxed) {
                // already maxed
                posInfo = windowData.posInfo;
                width = posInfo.width;
                height = posInfo.height;
                x = posInfo.x;
                y = posInfo.y;
                windowData.maxed = false;
                winObj.data('window', windowData);
            } else {
                // haven't maxed
                posInfo = {
                    width: winObj.width(),
                    height: winObj.height(),
                    x: winObj.position().left,
                    y: winObj.position().top
                };
                windowData.posInfo = posInfo;
                width = '100%';
                height = winObj.parent().height() - 56 + 'px';
                x = '0';
                y = '0';
                windowData.maxed = true;
                winObj.data('window', windowData);
            }
            winObj.animate({
                width: width,
                height: height,
                left: x,
                top: y
            }, 300);
        },
        min: function($this) {
            var winObj = $this ? $this : this;
            var posInfo,
                x,
                y,
                windowData = winObj.data('window');
            posInfo = {
                width: winObj.width(),
                height: winObj.height(),
                x: winObj.position().left,
                y: winObj.position().top
            };
            windowData.posInfo = posInfo;
            x = $('.taskbar .tasks li.' + windowData.appName).position().left + 56;
            y = winObj.parent().height() - 28;
            windowData.mined = true;
            winObj.animate({
                width: 0,
                height: 0,
                left: x,
                top: y
            }, 300);
            winObj.data('window', windowData);
        },
        close: function($this) {
            $('.taskbar').taskbar('closeWindow', $this);
            var winObj = $this ? $this : this;
            winObj.hide(300);
            winObj.removeData('window');
            setTimeout(function() {
                winObj.remove();

                var i = winList.indexOf($this.toArray()[0]);
                if (i !== -1) {
                    winList.splice(i, 1);
                }

                // update task bar activate
                if (winList.length > 0) {
                    Log($(winList[winList.length - 1]).data('window'));
                    $('.taskbar').taskbar('active', $(winList[winList.length - 1]));
                }
            }, 300);
        }
    };

    $.fn.window = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            Log().error('Method ' + method + ' does not exist in jQuery.window');
        }
    }
})(jQuery, window, document);
