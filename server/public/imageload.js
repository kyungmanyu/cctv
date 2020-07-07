(function() {
    var socket = io.connect("10.175.151.54:3000");


    if (window.Worker) {
        console.log("worker ok");
        var worker = new Worker("./iworker.js");

        // worker.postMessage(data);
        // worker.onmessage = (e) => {

        //     worker.terminate();
        // }

        // worker.postMessage("data");
        // worker.onerror = (e) => {
        //     console.log("error " + e.data);

        // }


    } else {
        console.log("worker NG");
    }



    var ctx = $('#canvas').get(0).getContext('2d');
    var ctx1 = $('#canvas1').get(0).getContext('2d');
    ctx.font = "15px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("image uploading...", 120, 100);

    ctx1.font = "15px Comic Sans MS";
    ctx1.fillStyle = "red";
    ctx1.textAlign = "center";
    ctx1.fillText("image uploading...", 120, 100);



    socket.on('message_from_img', function(data) { // 소켓 image event발생시




        worker.postMessage("data");
        start(data);

        // var ctx = $('#canvas').get(0).getContext('2d');
        // //var imageFactory = new ImageFactory(ctx);


        // var imagee = ctx.getImageData(0, 0, 280, 220);

        // imagee.src = data;
        // ctx.drawImage(imagee, 100, 100, 100, 100);



        // imagee.onload = function() {
        //     console.log("Draw");
        //     ctx.drawImage(imagee, 100, 100, 100, 100);
        // };



    });


    socket.on('message_from_img_around', function(data) { // 소켓 image event발생시

        start_around(data);
        // var ctx = $('#canvas').get(0).getContext('2d');
        // //var imageFactory = new ImageFactory(ctx);


        // var imagee = ctx.getImageData(0, 0, 280, 220);

        // imagee.src = data;
        // ctx.drawImage(imagee, 100, 100, 100, 100);



        // imagee.onload = function() {
        //     console.log("Draw");
        //     ctx.drawImage(imagee, 100, 100, 100, 100);
        // };



    });

    var ImageFactory = function(ctx) {
        this.ctx = ctx;
        this.drawImage = function(image_arg, image_x, image_y, image_w, image_h) {
            var _this = this;
            var image = new Image();
            image.src = image_arg;
            image.onload = function() {
                _this.ctx.drawImage(image, image_x, image_y, image_w, image_h);
            };
        };
    };




    // function start() {
    //     console.log("sendimg call ");
    //     var image = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png';

    //     var ctx = $('#canvas').get(0).getContext('2d');
    //     //var imageFactory = new ImageFactory(ctx);

    //     var imagee = new Image();
    //     imagee.src = image;
    //     imagee.onload = function() {
    //         ctx.drawImage(imagee, 100, 100, 100, 100);
    //     };
    // }

    function start(data) {
        // console.log("sendimg call ", data.buffer);
        // var image = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png';

        var ctx = $('#canvas').get(0).getContext('2d');

        //var imageFactory = new ImageFactory(ctx);

        var imagee = new Image();
        // imagee.src = 'data:image/jpeg;base64,' + data;
        // imagee.src = 'image/jpeg;base64,' + data;
        imagee.src = data;
        imagee.onload = function() {



            ctx.drawImage(imagee, 50, 50, 400, 400);


            // ctx.font = "15px Comic Sans MS";
            // ctx.fillStyle = "red";
            // ctx.textAlign = "center";
            // ctx.fillText("별풍선 주세요", 120, 100);

            var cw, ch;
            AwesomeFontOnload(start, 3000, ctx);

            function start() {
                ctx.font = '48px fontawesome';
                ctx.fillText('\uF064\uF065 \uF0a5', 20, 75);
            }

            function AwesomeFontOnload(callback, failAfterMS, cctx) {
                var c = document.createElement("canvas");

                var ccw, cch;
                var fontsize = 36;
                var testCharacter = '\uF047';
                ccw = c.width = fontsize * 1.5;
                cch = c.height = fontsize * 1.5;
                cctx.font = fontsize + 'px fontawesome';
                cctx.textAlign = 'center';
                cctx.textBaseline = 'middle';
                var startCount = pixcount();
                var t1 = performance.now();
                var failtime = t1 + failAfterMS;
                //
                requestAnimationFrame(fontOnload);
                //
                function fontOnload(time) {
                    var currentCount = pixcount();
                    if (time > failtime) {
                        // console.log('Font Awsome failed to load after ' + failAfterMS + 'ms.');
                    } else if (currentCount == startCount) {
                        requestAnimationFrame(fontOnload);
                    } else {
                        callback();
                    }
                }
                //
                function pixcount() {
                    cctx.clearRect(0, 0, ccw, cch);
                    cctx.fillText(testCharacter, ccw / 2, cch / 2);
                    var data = cctx.getImageData(0, 0, ccw, cch).data;
                    var count = 0;
                    for (var i = 3; i < data.length; i += 4) {
                        if (data[i] > 10) { count++; }
                    }
                    return (count);
                }
            }



            // Green rectangle
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "green";
            ctx.rect(120, 100, 150, 200);
            ctx.stroke();




            // var opacity = 20;
            // var w = 200;
            // ctx.clearRect(0, 0, w, w);
            // var o = w / 12;
            // var l = (w - 3 * o) / 2;
            // // some drawing styles
            // ctx.lineWidth = o / 4;
            // ctx.lineCap = "round";
            // ctx.lineJoin = "round";

            // var wings = [
            //     { color: "rgba(255,  68,  34, " + opacity + ")" }, // red
            //     { color: "rgba(255, 204,  34, " + opacity + ")" }, // yellow
            //     { color: "rgba( 34,  68, 255, " + opacity + ")" }, // blue
            //     { color: "rgba( 68, 170,  68, " + opacity + ")" }, // green
            // ];
            // ctx.translate(+w / 2, +w / 2);
            // ctx.rotate(Math.PI);
            // for (var i in wings) {
            //     var wing = wings[i];
            //     ctx.fillStyle = c.strokeStyle = wing.color;
            //     // draw a wing
            //     ctx.save();
            //     ctx.translate(+w / 4, +w / 4);
            //     ctx.rotate(Math.PI);
            //     ctx.translate(-w / 4, -w / 4);
            //     ctx.beginPath();
            //     ctx.moveTo(o, o);
            //     ctx.arc(o, o + l, l, -Math.PI / 2, 0, false);
            //     ctx.arc(o + l / 2, o + l, l / 2, 0, -Math.PI, true);
            //     ctx.lineTo(o, o);
            //     ctx.closePath();
            //     ctx.fill();
            //     ctx.stroke();
            //     ctx.restore();
            //     ctx.rotate(Math.PI / 2);
            // }

        };
    }

    function start_around(data) {
        // console.log("sendimg call ", data.buffer);
        // var image = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png';


        var ctx1 = $('#canvas1').get(0).getContext('2d');
        //var imageFactory = new ImageFactory(ctx);

        var imagee = new Image();
        // imagee.src = 'data:image/jpeg;base64,' + data;
        // imagee.src = 'image/jpeg;base64,' + data;
        imagee.src = data;
        imagee.onload = function() {




            ctx1.drawImage(imagee, 50, 50, 400, 400);


            ctx1.font = "15px Comic Sans MS";
            ctx1.fillStyle = "red";
            ctx1.textAlign = "center";
            ctx1.fillText("별풍선 주세요!!", 120, 100);




        };
    }





    //$("#testpicture").each(function(img){

    //$(this).attr("src",data.url) });

    //var ctx = document.getElementById('testimg').getContext('2d');

    //var testimg = new Image();

    //testimg.src = 'data:image/jpeg;base64, ' +data.buffer;
    //testimg.data = data;
    //testimg = data;
    //ctx.drawImage(testimg, 0, 0);
    //ctx.putImageData(testimg, 0, 0);



})();