var habboEmbed = "";

function updateEmbedSize() {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	let resolutionLargeur = window.screen.width;
	const embed = document.getElementById('habboEmbed');
	const fixedRight = document.getElementById('fixedRight');
	const main_console = document.getElementById('main-console');
	const big_furni = document.querySelectorAll('.big-furni');
	const main_box = document.querySelectorAll('.main-box');
	const furni_icon = document.querySelectorAll('.furni_icon');
	const rows = document.querySelectorAll('.row');

	if (screenWidth < resolutionLargeur / 1.2) {
        fixedRight.style.display = 'flex';
        fixedRight.style.flexDirection = 'column';
        rows.forEach(function(row) {
            row.style.flexDirection = 'column';
        });
    } else {
        fixedRight.style.display = 'flex';
        fixedRight.style.flexDirection = 'row';
        rows.forEach(function(row) {
            row.style.flexDirection = 'row';
        });
    }

	if (embed) {
		embed.style.width = screenWidth  - (screenWidth * 0.07) + 'px';
		embed.style.height = screenHeight + (screenWidth * 0.01) + 'px';
	}

	if (fixedRight) {
		fixedRight.style.width = (screenWidth * 0.165) + 'px';
		fixedRight.style.height = screenHeight + 'px';
	}
	if (main_console) {
		main_console.style.width = (screenWidth * 0.157) + 'px';
		main_console.style.height = screenHeight + 'px';
	}
	big_furni.forEach(function(element) {
		element.style.maxWidth = (screenWidth * 0.04) + 'px';
		element.style.minWidth = (screenWidth * 0.04) + 'px';
		element.style.maxHeight = (screenWidth * 0.04) + 'px';
		element.style.minHeight = (screenWidth * 0.04) + 'px';
	});
	main_box.forEach(function(element) {
		element.style.maxWidth = (screenWidth * 0.04) + 'px';
		element.style.minWidth = (screenWidth * 0.04) + 'px';
		element.style.maxHeight = (screenWidth * 0.04) + 'px';
		element.style.minHeight = (screenWidth * 0.04) + 'px';
	});
	furni_icon.forEach(function(element) {
		element.style.maxHeight = (screenHeight * 0.030) + 'px';
		element.style.minHeight = (screenHeight * 0.030) + 'px'; 
	});
	
}

window.addEventListener('resize', function() {
	updateEmbedSize();
});

function fullScreen() {
	const elem = document.documentElement;
	const fullscreenBtn = document.getElementById('fullscreenBtn');

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
	setTimeout(() => {
        const isNowFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        if (isNowFullscreen) {
            fullscreenBtn.style.boxShadow = "inset 2px 2px 0px 0px #905700, inset 0px 2px 0px 0px #e0aa00, inset 0px 0px 0px 2px #582400, inset 0px -2px 0px 0px #582400, inset 0px 0px 0px 0px #905700";
        } else {
            fullscreenBtn.style.boxShadow = "";
        }
    }, 100);
};

setTimeout(() => {
updateEmbedSize();
}, 100);