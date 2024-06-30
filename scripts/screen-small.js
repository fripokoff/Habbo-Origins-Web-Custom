function updateEmbedSize() {
    const embed = document.getElementById('habboEmbed');
    if (embed) {
        // Obtient les dimensions actuelles et enlève 'px' pour convertir en nombre
        let currentWidth = parseInt(embed.style.width.replace('px', '')) || embed.offsetWidth;
        let currentHeight = parseInt(embed.style.height.replace('px', '')) || embed.offsetHeight;

        // Augmente les dimensions de 1px
        embed.style.width = `${currentWidth + 1}px`;
        embed.style.height = `${currentHeight + 1}px`;
    }
}

setTimeout(() => {
	updateEmbedSize() 
}, 3000);