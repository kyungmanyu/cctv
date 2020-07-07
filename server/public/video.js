(function() {

    var canvas = document.getElementById('canvas1'),
        context = canvas.getContext('2d'),
        video = document.getElementById('video'),
        vendorUrl = window.URL || window.webkitURL;
    var socket = io.connect("http://10.175.151.54:3000");

    var index = 0;
    navigator.getMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetuserMedia ||
        navigator.msGetUserMedia;

    navigator.getMedia({
        video: true,
        audio: false
    }, function(stream) {
        // video.src = vendorUrl.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    }, function(error) {
        // an error occurred
    });


    video.addEventListener('play', function() {
        draw(this, context, 1024, 768);
    }, false);

    function draw(video, context, width, height) {
        var image, data, i, r, g, b, brightness;
        // var socket = io('http://localhost:3000');

        // var socket = io('10.175.151.54:3000');
        context.drawImage(video, 0, 0, width / 2, height / 2);
        // console.log("drawimg");


        // console.log("jpeg", idata);
        // console.log("jpeg type", typeof(idata));
        image = context.getImageData(0, 0, width / 2, height / 2);


        var idata = canvas.toDataURL('image/jpeg', 1.0);
        // console.log("idata", idata);
        newblob = dataURItoBlob(idata);
        socket.emit('message_from_img_around', idata);
        // socket.disconnect();

        data = image.data;
        // socket.emit('message_from_img_size', data.length);


        // for (i = 0; i < data.length; i += 4) {
        //     r = data[i];
        //     g = data[i + 1];
        //     b = data[i + 2];
        //     brightness = (r + g + b) / 3;

        //     data[i] = data[i + 1] = data[i + 2] = brightness;

        // }


        index++;

        console.log("index", index);
        if (index == 30) {
            // socket.emit('message_from_img_size', e.length);

            // socket.emit('message_from_img', newblob);
            // if (window.Worker) {
            //     console.log("worker ok");
            //     var worker = new Worker("./worker.js");

            //     // worker.postMessage(data);
            //     worker.onmessage = (e) => {

            //         worker.terminate();
            //     }

            //     worker.postMessage("data");
            //     worker.onerror = (e) => {
            //         console.log("error " + e.data);

            //     }


            // } else {
            //     console.log("worker NG");
            // }

            // for (i = 0; i < data.length / 100; i++) {

            //     socket.emit('message_from_img', data[i]);
            // }
            // socket.emit('message_from_img_end', "");

            index = 0;
        }

        context.putImageData(image, 0, 0);
        // console.log(image);

        setTimeout(draw, 100, video, context, width, height);
    }

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

})();