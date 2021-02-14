
(function () {
	const isIE = document.documentMode && document.uniqueID;
	if (isIE) {
		const polyfill = document.createElement("script");
		polyfill.type = "text/javascript";
		polyfill.src = "https://polyfill.io/v3/polyfill.min.js";
		document.getElementsByTagName("head")[0].appendChild(polyfill);
	}
})();
