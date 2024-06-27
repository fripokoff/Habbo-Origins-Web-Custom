function updateEmbedSize() {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	const embed = document.getElementById('habboEmbed');
	if (embed) {
		embed.style.width = screenWidth  - (screenWidth * 0.1) + 'px';
		embed.style.height = screenHeight + 'px';
	}

}

window.addEventListener('resize', function() {
	// updateEmbedSize();
});

function fullScreen() {
	const elem = document.documentElement;
	const isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

	if (!isFullscreen) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			/* Firefox */
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Chrome, Safari & Opera */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE/Edge */
			elem.msRequestFullscreen();
		}
	} else { // Sortir du plein écran
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			/* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			/* Chrome, Safari & Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE/Edge */
			document.msExitFullscreen();
		}
	}
};