;(function($, window, document, undefined) {

    var winList = [];

    function createHTML(options) {
        var childHTML = [];
        childHTML.push('<div class="title-bar"><ul class="win-ctrl">');
        options.control.indexOf('close') > -1 ? childHTML.push('<li><a class="close"><i></i></a></li>') : null;
        options.control.indexOf('max') > -1 ? childHTML.push('<li><a class="max"><i></i></a></li>') : null;
        options.control.indexOf('min') > -1 ? childHTML.push('<li><a class="min"><i></i></a></li>') : null;
        childHTML.push('</ul></div>');
        childHTML.push('<div class="tool-bar"><h1 class="page-title">');
        if (options.side) {
            childHTML.push('<i class="fa fa-fw fa-reorder"></i>');
        }
        childHTML.push(options.appName + '</h1>' +
            '' + (options.toolBar ? options.toolBar : '') + '</div>');
        childHTML.push('<div class="menu-bar">' + (options.menuBar ? options.menuBar : '') + '</div>');
        childHTML.push('<div class="content"><div class="overlay"></div>');
        if (options.url) {
            childHTML.push('<iframe src="' + options.url + '" frameborder="0"></iframe></div>');
        } else {
            childHTML.push((options.content ? options.content : '') + '</div>');
        }

        childHTML.push('<div class="status-bar">' + (options.statusBar ? options.statusBar : '') + '</div>');
        if (options.side) {
            childHTML.push('<div class="sidebar"></div>');
        }
        return childHTML.join('');
    }

    function toggleSide($this) {
        var side = $this.find('.sidebar');
        if (side.is(':visible')) {
            side.animate({ left: '-' + side.width() + 'px' }, 500);
            setTimeout(function() {
                side.hide();
            }, 500);
            $this.find('.sidebar-overlay').remove();
        } else {
            side.css({
                left: '-' + side.width() + 'px'
            });
            side.show().animate({ left: 0 }, 500);
            $('<div/>', { class: 'sidebar-overlay' })
                .appendTo($this)
                .css({
                    position: 'absolute',
                    width: '100%',
                    height: $this.height(),
                    right: 0,
                    top: 0,
                    'background-color': 'rgba(0, 0, 0, .5)'
                })
                .animate({
                    width: $this.width() - $this.find('.sidebar').width()
                }, 500).click(function() {
                    toggleSide($this);
                });
        }
    }

    var methods = {
        init: function(options) {

            // default options
            var settings = $.extend({
                debug: true,
                appName: 'application',
                icon: 'fa-file-o',
                url: '',
                img: '',
                control: ['close', 'max', 'min'],
                confirm: '', // confirm function
                toolBar: '', // toolBar content
                menuBar: '',
                content: '',
                statusBar: '',
                side: null, // left or right or null
                position: {
                    x: 20 + 'px',
                    y: 20 + 'px'
                },
                size: {
                    width: '600px',
                    height: '400px'
                }
            }, options);

            $('.wrap-container').on('mouseup', function() {
                $('.wrap-container').unbind('mousemove');
            });

            return this.each(function() {
                var $this = $(this);
                $this.hide();
                $this.append(createHTML(settings));
                $('.window.active').removeClass('active');
                $this.addClass('active');
                // init window data
                if (!$this.data('window')) {
                    $this.data('window', {
                        appName: settings.appName,
                        icon: settings.icon,
                        img: settings.img
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

                // load the sidebar asynchronously
                $this.find('.sidebar').hide();
                if (settings.side) {
                    $.ajax({
                        url: settings.side,
                        dataType: 'html'
                    }).done(function(data) {
                        if (data) {
                            $this.find('.sidebar').append(data);
                        }
                    });
                    $this.find('.page-title').click(function() {
                        toggleSide($this);
                    });

                    $this.delegate('.sidebar li a', 'click', function(e) {
                        e.preventDefault();
                        $this.find('iframe').attr('src', $(this).attr('href'));
                        toggleSide($this);
                    });
                }

                // movement event
                $this.find('.title-bar').on('mousedown', function(event) {
                    event.preventDefault();
                    var startX = event.pageX - $this.position().left;
                    var startY = event.pageY - $this.position().top;
                    $('.wrap-container').bind('mousemove', function(e) {
                        e.preventDefault();
                        $this.css({
                            left: e.pageX - startX + 'px',
                            top: e.pageY - startY + 'px'
                        });
                    });
                });

                // z-index event
                $this.on('mouseup', function() {
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
            $('.window.active').removeClass('active');
            winObj.addClass('active');

            winList.splice(i, 1);
            winList.push(winObj.toArray()[0]);

            $(winList).each(function(index) {
                $(this).css({
                    'z-index': index
                });
            });

            var windowData = winObj.data('window');
            if (windowData.mined) {
                winObj.window('min');
            }
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
            if (windowData.mined) {
                // already mined
                posInfo = windowData.posInfo;
                windowData.mined = false;
                winObj.data('window', windowData);
                winObj.animate({
                    width: posInfo.width,
                    height: posInfo.height,
                    left: posInfo.x,
                    top: posInfo.y
                }, 300);
            } else {
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
            }
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
