function start_stream(){
    var manifest_url = '/manifest
    var fallback_video = '/static/video/unsupported.mp4';
    var player = document.getElementById('player');

    if(Hls.isSupported()) {

        var hls = new Hls();
        hls.loadSource(manifest_url);
        hls.attachVideo(player);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
                player.play();
        });


     } else {
        // If HLS is not supported, play fallback video instead.
        player.src = fallback_video;
        player.load();

        if (typeof player.loop == 'boolean') { 
            // loop supported
            player.loop = true;

        } else { 
            // loop property not supported
            player.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        player.play();
    
     } // HLS is not supported
 

    player.muted = true;

} // function start_stream()



