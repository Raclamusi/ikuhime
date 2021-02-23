
(function () {
    const isIE = document.documentMode && document.uniqueID;
    if (isIE) {
        const polyfill = document.createElement("script");
        polyfill.type = "text/javascript";
        polyfill.src = "https://polyfill.io/v3/polyfill.min.js?features=es2015%2Ces2016%2Ces2017";
        document.getElementsByTagName("head")[0].appendChild(polyfill);

        (function (arr) {
            arr.forEach(function (item) {
                if (item.hasOwnProperty('remove')) {
                    return;
                }
                Object.defineProperty(item, 'remove', {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                    value: function remove() {
                       this.parentNode.removeChild(this);
                    }
                });
            });
        })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
    }
})();
