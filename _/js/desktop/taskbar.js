/**
 * task bar event
 */
;(function($, window, document, undefined) {

    var taskList = {};

    var methods = {
        init: function(options) {
            var setting = $.extend({

            }, options);

            return this.each(function() {
                var $this = $(this);

                $this.delegate('.tasks li a', 'click', function() {
                    var appName = $(this).parent().attr('class').replace('active', '').trim();
                    if (appName) {
                        var windowList = taskList[appName];
                        if (windowList) {
                            windowList.windows[0].window('active');
                        }
                        $this.find('.tasks li.active').removeClass('active');
                        $this.find('.tasks li.' + appName.trim()).addClass('active');
                    }
                });

                $this.delegate('.tasks li a', 'mouseenter', function() {
                    var appName = $(this).parent().attr('class').replace('active', '').trim(),
                        left = $(this).parent().position().left + 56;
                    $this
                        .find('.multi-window')
                        .html('<li class="' + appName + '"><a>' + appName + '</a></li>')
                        .animate({
                            left: left
                        }, 300);
                }).delegate('.tasks li a', 'mouseleave', function() {
                    $this.find('.multi-window').on('mouseleave', function() {
                        $this.find('.multi-window').html('');
                    });
                });

                $this.delegate('.multi-window li a', 'click', function() {
                    Log($(this).parent().attr('class'));
                });
            });
        },
        addWindow: function(win) {
            var appName = $(win).data('window').appName,
                icon = $(win).data('window').icon;
            if (!taskList[appName]) {
                taskList[appName] = {
                    windows: [],
                    icon: icon,
                    appName: appName
                };
                $('<li class="' + appName + '"><a><i class="fa ' + icon + '"></i></a></li>').appendTo($(this).find('.tasks'));
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
