
exportObject.loader = function(root, options = {}) {
    var root    = document.querySelector(root);
    var iframes = root.querySelectorAll('iframe');

    var defaults = {
        "services": []
    };

    var defaultKeys = Object.keys(defaults);

    for (var o = 0; o < defaultKeys.length; o++) {
        if (!options[defaultKeys[o]]) {
            options[defaultKeys[o]] = defaults[defaultKeys[o]];
        }
    }

    for (var i = 0; i < iframes.length; i++) {
        var iframe      = iframes[i];
        var src         = iframe.src;
        var embedBlock  = document.createElement('div');
        var width       = iframe.offsetWidth;
        var height      = iframe.offsetHeight;
        var container   = iframe.parentNode;

        var image       = document.createElement('img');
        var playButton  = document.createElement('div');

        for (var s = 0; s < options.services.length; s++) {
            var service = options.services[s];
            if (service.match(src)) {
                var thumbnail = service.getThumbnail(src);
            }
        }

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

        if (thumbnail) {
            image.src         = thumbnail;
        }

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
