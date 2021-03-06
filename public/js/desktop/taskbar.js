/**
 * task bar event
 */
;(function($, window, document, undefined) {

    var taskList = {},
        tout, // timeout stamp
        hasShowMulWin; // whether the multi window is shown;

    var methods = {
        init: function(options) {
            var setting = $.extend({

            }, options);

            return this.each(function() {
                var $this = $(this);

                $this.find('.start').on('click', function() {
                    if ($this.find('.start-menu').is(':visible')) {
                        $this.find('.start-menu').hide();
                    } else {
                        if ($(this).data('hasData')) {
                            $this.find('.start-menu').show(300);
                        } else {
                            var appListStr = [];
                            $('.desktop .apps li a').each(function() {
                                var iconRimg = '';
                                if ($(this).find('i').length && $(this).find('i').length > 0) {
                                    var icon = $(this).find('i').attr('class').match(/(fa-[^\s"]*)/g)[0];
                                    iconRimg = '<i class="fa ' + icon + '"></i>'
                                } else {
                                    var img = $(this).find('img').attr('src');
                                    iconRimg = '<img src="' + img + '" />';
                                }
                                appListStr.push('<li><a>' + iconRimg + '<span>' + $(this).attr('data-name') + '</span></a></li>')
                            });
                            $this
                                .find('.start-menu')
                                .html(appListStr);
                            $this.find('.start-menu').show(300);
                            $(this).data('hasData', true);
                        }
                    }
                });

                $this.delegate('.start-menu li a', 'click', function() {
                    var index = $(this).parent().index();
                    $('.desktop .apps li:eq(' + index + ')').find('a').trigger('click');
                    $this.find('.start-menu').hide();
                });

                $this.delegate('.tasks li a', 'click', function() {
                    $this.find('.start-menu').hide(300);
                    var appName = $(this).parent().attr('class').replace('active', '').trim();
                    if (appName) {
                        var windowList = taskList[appName];
                        tout ? clearTimeout(tout) : null;
                        if(taskList[appName].windows.length > 1) {
                            var delay = 0;
                            if (hasShowMulWin) {
                                delay = 300;
                            }
                            var multiHTML = '';
                            for (var i = 0; i < taskList[appName].windows.length; i++) {
                                if (taskList[appName].windows.length > 1) {
                                    multiHTML += '<li class="' + appName + '"><a>' + appName + ' ' + (i + 1) + '</a></li>';
                                } else {
                                    multiHTML += '<li class="' + appName + '"><a>' + appName + '</a></li>';
                                }
                            }
                            $this.find('.multi-window').show();
                            $this
                                .find('.multi-window')
                                .html(multiHTML)
                                .animate({
                                    left: $(this).parent().position().left + 56
                                }, delay);
                            hasShowMulWin = true;
                        } else {
                            if (windowList) {
                                windowList.windows[0].window('active');
                            }
                            $this.find('.multi-window').hide();
                        }
                        $this.find('.tasks li.active').removeClass('active');
                        $this.find('.tasks li.' + appName.trim()).addClass('active');
                    }
                });

                $this.delegate('.tasks li a', 'mouseenter', function() {
                    var appName = $(this).parent().attr('class').replace('active', '').trim(),
                        left = $(this).parent().position().left + 56;
                    tout ? clearTimeout(tout) : null;
                    tout = window.setTimeout(function() {
                        $this.find('.start-menu').hide(300);
                        var delay = 0;
                        if (hasShowMulWin) {
                            delay = 300;
                        }
                        var multiHTML = '';
                        for (var i = 0; i < taskList[appName].windows.length; i++) {
                            if (taskList[appName].windows.length > 1) {
                                multiHTML += '<li class="' + appName + '"><a>' + appName + ' ' + (i + 1) + '</a></li>';
                            } else {
                                multiHTML += '<li class="' + appName + '"><a>' + appName + '</a></li>';
                            }
                        }
                        $this
                            .find('.multi-window')
                            .html(multiHTML)
                            .animate({
                                left: left
                            }, delay);
                        $this.find('.multi-window').show();
                        hasShowMulWin = true;
                    }, 500);
                }).delegate('.tasks li a', 'mouseleave', function() {
                    tout ? clearTimeout(tout) : null;
                    if (hasShowMulWin) {
                        tout = window.setTimeout(function() {
                            $this.find('.multi-window').hide();
                            hasShowMulWin = false;
                        }, 800);
                    }
                });

                $this.delegate('.multi-window', 'mouseenter', function() {
                    tout ? clearTimeout(tout) : null;
                });

                $this.delegate('.multi-window', 'mouseleave', function() {
                    tout ? clearTimeout(tout) : null;
                    tout = window.setTimeout(function() {
                        $this.find('.multi-window').hide();
                        hasShowMulWin = false;
                    }, 800);
                });

                $this.delegate('.multi-window li a', 'click', function(event) {
                    var appName = $(this).parent().attr('class'),
                        index = $(this).parent().index();
                    taskList[appName].windows[index].window('active');
                });
            });
        },
        addWindow: function(win) {
            var appName = $(win).data('window').appName,
                icon = $(win).data('window').icon;
                img = $(win).data('window').img;
            if (!taskList[appName]) {
                taskList[appName] = {
                    windows: [],
                    icon: icon,
                    img: img,
                    appName: appName
                };
                if (icon != 'img') {
                    $('<li class="' + appName + '"><a><i class="fa ' + icon + '"></i></a></li>').appendTo($(this).find('.tasks'));
                } else {
                    $('<li class="' + appName + '"><a><img class="shadowed" src="' + img + '"></img></a></li>').appendTo($(this).find('.tasks'));
                }

            }
            if (taskList[appName].windows.indexOf(win) === -1) {
                taskList[appName].windows.push(win);
            }
            $(this).find('.tasks li.active').removeClass('active');
            $(this).find('.tasks li.' + appName).addClass('active');
        },

        active: function(win) {
            var appName = $(win).data('window').appName;
            $(this).find('.tasks li.active').removeClass('active');
            $(this).find('.tasks li.' + appName).addClass('active');
        },

        closeWindow: function(win) {
            var appName = $(win).data('window').appName,
                index = taskList[appName].windows.indexOf(win);
            taskList[appName].windows.splice(index, 1);
            if (taskList[appName].windows.length === 0) {
                delete taskList[appName];
                $(this).find('.tasks li.' + appName).remove();
            }
        }
    };

    $.fn.taskbar = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            Log().error('Method ' + method + ' does not exist in jQuery.taskbar');
        }
    }
})(jQuery, window, document);
