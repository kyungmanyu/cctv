(function() {
    var socket = io.connect("http://10.175.151.54:3000");
    console.log("woker start");
    onmessage = (e) => {

        console.log("woker data", e)
            // socket.emit('message_from_img_size', e.length);
            // socket.emit('message_from_img', e);
    }

    postMessage(null);
})();