(function(window) {

    if (typeof window.ontouchstart !== 'undefined') {
        document.addEventListener('ontouchstart', tap);
    }
    document.addEventListener('mousedown', tap);

    function tap(e) {
        console.log(e);
    }
})(window);
