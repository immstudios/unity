PROFILES = {

        "v-1000" : [
            ("an", False),
            ("s", "512x288"),
            ("pix_fmt", "yuv420p"),

            ("c:v", "libx264"),
            ("profile:v", "baseline"),
            ("level:v", "4.0"),
            ("b:v", "1000k"),

            ("g", "50"),
            ("keyint_min", "50"),
            ("x264opts", "keyint=50:min-keyint=50:no-scenecut"),
            ("video_track_timescale", "25")
        ],

        "v-2400" : [
            ("an", False),
            ("s", "960x540"),
            ("pix_fmt", "yuv420p"),

            ("c:v", "libx264"),
            ("profile:v", "baseline"),
            ("level:v", "4.0"),
            ("b:v", "2400k"),

            ("g", "50"),
            ("keyint_min", "50"),
            ("x264opts", "keyint=50:min-keyint=50:no-scenecut"),
            ("video_track_timescale", "25")
        ],

        "v-4000" : [
            ("an", False),
            ("s", "1920x1080"),
            ("pix_fmt", "yuv420p"),

            ("c:v", "libx264"),
            ("profile:v", "baseline"),
            ("level:v", "4.0"),
            ("b:v", "4000k"),

            ("g", "50"),
            ("keyint_min", "50"),
            ("x264opts", "keyint=50:min-keyint=50:no-scenecut"),
            ("video_track_timescale", "25")
        ],


        "a-128" : [
            ("vn", False),
            ("ar", "48000"),
            ("c:a", "libvo_aacenc"),
            ("b:a", "128k"),
            ("force_key_frames", "50")
        ]

}
