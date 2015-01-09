(function(window) {

    var preTime = 0,
        preSpeed = 0,
        startX, startY,
        a,
        taped = false;

    if (typeof window.ontouchstart !== 'undefined') {
        document.addEventListener('touchstart', tap);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', release);
    }
    document.addEventListener('mousedown', tap);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', release);

    function tap(e) {
        taped = true;
        preTime = new Date().getTime();
    }

    function drag(e) {
        if (taped) {
            var nowTime = new Date().getTime();
            var t = nowTime - preTime;
            var distance = 0;
            var speed;
            if (startX && startY) {
                distance = Math.sqrt(Math.pow(e.pageX - startX, 2) + Math.pow(e.pageY - startY, 2));
                speed = distance / t;
                if (preSpeed) {
                    a = (speed - preSpeed) / t;
                }
                preSpeed = speed;
            } else {
                startX = e.pageX;
                startY = e.pageY;
                distance = 0;
                speed = 0;
            }
            console.log(Math.round(speed), Math.round(a));
            preTime = nowTime;
        }
    }

    function release(e) {
        console.log(preSpeed);
        var t = 1;
        var fa = 1;
        while(preSpeed > 0) {
            preSpeed = preSpeed - fa * t;
            console.log(Math.round(preSpeed));
        }
        taped = false;
    }
})(window);

Log(Log({ test: 'test' }));
