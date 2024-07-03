var habboEmbed = "";
var actual_url = window.location.href;
let countryCode = localStorage.getItem('origins_hotel') || 'us';
localStorage.setItem('origins_hotel', countryCode);
var dcr = "https://origins.hiper.esp.br/latest/habbo.dcr";
var loader_config = {
	"dcr": dcr,
	"us": {
		"info_host": "game-ous.habbo.com",
		"info_port": "40001",
		"mus_host": "game-ous.habbo.com",
		"mus_port": "40002",
		"reload": actual_url,
		"site": actual_url,
		"prefix": actual_url,
		"fatal_error": actual_url,
		"external_variables": "http://origins-gamedata.habbo.com/external_variables/1",
		"external_texts": "http://origins-gamedata.habbo.com/external_texts/1"
	},
	"br": {
		"info_host": "game-obr.habbo.com",
		"info_port": "40001",
		"mus_host": "game-obr.habbo.com",
		"mus_port": "40002",
		"reload": actual_url,
		"site": actual_url,
		"prefix": actual_url,
		"fatal_error": actual_url,
		"external_variables": "http://origins-gamedata.habbo.com.br/external_variables/1",
		"external_texts": "http://origins-gamedata.habbo.com.br/external_texts/1"
	},
	"es": {
		"info_host": "game-oes.habbo.com",
		"info_port": "40001",
		"mus_host": "game-oes.habbo.com",
		"mus_port": "40002",
		"reload": actual_url,
		"site": actual_url,
		"prefix": actual_url,
		"fatal_error": actual_url,
		"external_variables": "http://origins-gamedata.habbo.es/external_variables/1",
		"external_texts": "http://origins-gamedata.habbo.es/external_texts/1"
	},
}



function setLoaderbyCountryCode(countryCode) {
	localStorage.setItem('origins_hotel', countryCode);
	habboEmbed = document.getElementById('container');
	habboEmbed.innerHTML = `<embed id="habboEmbed" src="${loader_config.dcr}" bgcolor="#000000" width="100%" height="100%" swvolume="true"
                    swrestart="false" swpauseplay="false" swfastforward="false" swtitle="Habbo Hotel" swcontextmenu="true"
                    swstretchstyle="meet" swStretchVAlign="top" swStretchHAlign="left" swtext="" type="application/x-director" pluginspage="http://www.macromedia.com/shockwave/download/"
                    sw2="connection.info.host=${loader_config[countryCode].info_host};connection.info.port=${loader_config[countryCode].info_port}"
                    sw3="connection.mus.host=${loader_config[countryCode].mus_host};connection.mus.port=${loader_config[countryCode].mus_port}"
                    sw4="site.url=${loader_config[countryCode].site};url.prefix=${loader_config[countryCode].prefix}"
                    sw5="client.reload.url=${loader_config[countryCode].reload};client.fatal.error.url=${loader_config[countryCode].actual_url}"
                    sw6="external.variables.txt=${loader_config[countryCode].external_variables}"
                    sw7="external.texts.txt=${loader_config[countryCode].external_texts}"
                    sw8="client.allow.cross.domain=1;client.notify.cross.domain=0"></embed>`;
}
  if (!localStorage.getItem('origins_hotel')) {
	localStorage.setItem('origins_hotel', 'us');
}

setTimeout(() => {
setLoaderbyCountryCode(countryCode);
}, 500);

