exportObject.youtubeService = {
        match: function(src) {
            return src.match(/.+youtube.+/);
        },

        getThumbnail: function(src) {
            var code      = src.replace(/^.+embed\/([^\?$]+)[\?$].*/g, "$1");
            var thumbnail = "https://img.youtube.com/vi/"+ code +"/sddefault.jpg";
            return thumbnail;
        }
};
