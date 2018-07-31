
module.export = function() {
    var iframes = document.querySelectorAll('iframe');

    for (var i = 0; i < iframes.length; i++) {
        var iframe      = iframes[i];
        var src         = iframe.src;
        var embedBlock  = document.createElement('div');
        var width       = iframe.width;
        var height      = iframe.height;
        var container   = iframe.parentNode;
        var code        = src.replace(/^.+embed\/([^\?$]+)[\?$].*/g, "$1");
        var thumbnail   = "https://img.youtube.com/vi/"+ code +"/sddefault.jpg";
        var image       = document.createElement('img');
        var playButton  = document.createElement('div');

        var cloneProperties = [
            'position',
            'top',
            'left',
            'bottom',
            'right',
            'margin',
            'padding',
            'display',
            'float',
            'clear',
            'transform',
            'box-sizing',
            'border'
        ];

        container.replaceChild(embedBlock, iframe);

        embedBlock.dataset.src = src;
        embedBlock.style.width = width;
        embedBlock.style.height = height;
        iframe.src    = '';
        embedBlock.id = i;

        embedBlock.classList.add('youtube');
        embedBlock.appendChild(playButton);
        playButton.classList.add('play-button');

        for (var p = 0; p < cloneProperties.length; p++) {
            embedBlock.style.setProperty(
                cloneProperties[p],
                iframe.style.getPropertyValue(cloneProperties[p])
            );
        }

        image.src         = thumbnail;
        embedBlock.image  = image;
        image.embedBlock  = embedBlock;
        embedBlock.iframe = iframe;
        iframe.embedBlock = embedBlock;

        image.addEventListener('load', function() {
            this.embedBlock.appendChild(this);
        });

        embedBlock.addEventListener('click', function() {
            this.parentNode.replaceChild(this.iframe, this);
            this.iframe.src = this.dataset.src + '&autoplay=1';
        });
    }
}
