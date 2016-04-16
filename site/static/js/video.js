function start_stream(){
    var player = $('#player').julia({
        autoplay: false,
        muted: false,
        responsive: true,
        debug: true,
        live: true,
        dimensions: [
            [1280,720],
            [960,540],
            [640,360],
        ],
        i18n: {
            liveText: '',
        }
    });
} // function start_stream()


$(document).ready(function() {
    start_stream();
});
