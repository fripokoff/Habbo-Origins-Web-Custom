var actual_url = window.location.href;
let countryCode = localStorage.getItem('origins_hotel') || 'us';
localStorage.setItem('origins_hotel', countryCode);
var dcr = "https://origins.hiper.esp.br/latest/habbo.dcr";
let highestVersionRelease = 0;
// var dcr = "http://fripokoff.github.io/Habbo-Origins-Web-Custom/dcr/habbo.dcr";
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
	const countryBtnImg = document.querySelector('#countryBtn .avatar');
    countryBtnImg.src = `images/${countryCode}.jpg`;
	document.getElementById('countriesPopup').style.display = 'none';
	habboEmbed = document.getElementById('container');
	habboEmbed.innerHTML = `<embed id="habboEmbed" src="${loader_config.dcr}" bgcolor="#000000" width="1920" height="1080" swvolume="true"
                    swrestart="false" swpauseplay="false" swfastforward="false" swtitle="Habbo Hotel" swcontextmenu="true"
                    swstretchstyle="meet" swStretchVAlign="top" swStretchHAlign="left" swtext="" type="application/x-director" pluginspage="http://www.macromedia.com/shockwave/download/"
                    sw2="connection.info.host=${loader_config[countryCode].info_host};connection.info.port=${loader_config[countryCode].info_port}"
                    sw3="connection.mus.host=${loader_config[countryCode].mus_host};connection.mus.port=${loader_config[countryCode].mus_port}"
                    sw4="site.url=${loader_config[countryCode].site};url.prefix=${loader_config[countryCode].prefix}"
                    sw5="client.reload.url=${loader_config[countryCode].reload};client.fatal.error.url=${loader_config[countryCode].actual_url}"
                    sw6="external.variables.txt=${loader_config[countryCode].external_variables}"
                    sw7="external.texts.txt=${loader_config[countryCode].external_texts}"
                    sw8="client.allow.cross.domain=1;client.notify.cross.domain=0"></embed>`;
	updateOnlineUsers(countryCode);
}

function setLoaderbyCustomConfig(customConfig) {
	habboEmbed = document.getElementById('container');
	habboEmbed.innerHTML = `<embed id="habboEmbed" src="${customConfig.dcr}" bgcolor="#000000" width="1920" height="1080" swvolume="true"
					  swrestart="false" swpauseplay="false" swfastforward="false" swtitle="Habbo Hotel" swcontextmenu="true"
					  swstretchstyle="meet" swStretchVAlign="top" swStretchHAlign="left" swtext="" type="application/x-director" pluginspage="http://www.macromedia.com/shockwave/download/"
					  sw2="connection.info.host=${customConfig.info_host};connection.info.port=${customConfig.info_port}"
					  sw3="connection.mus.host=${customConfig.mus_host};connection.mus.port=${customConfig.mus_port}"
					  sw4="site.url=${customConfig.site};url.prefix=${customConfig.prefix}"
					  sw5="client.reload.url=${customConfig.reload};client.fatal.error.url=${customConfig.fatal_error}"
					  sw6="external.variables.txt=${customConfig.external_variables}"
					  sw7="external.texts.txt=${customConfig.external_texts}"
					  sw8="client.allow.cross.domain=1;client.notify.cross.domain=0"></embed>`;
  }
var popup = document.getElementById("popup");
var span = document.getElementsByClassName("closeBtn")[0];

function customSettings() {
	const savedConfig = JSON.parse(localStorage.getItem('loaderConfig'));
	if (savedConfig) {
	  Object.keys(savedConfig).forEach(key => {
		const input = document.getElementById(key);
		if (input) {
		  input.value = savedConfig[key];
		}
	  });
	}
	popup.style.display = "block";
  }

span.onclick = function() {
  popup.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}

document.querySelector('.launch-button button').addEventListener('click', function() {
	const customConfig = {
	  dcr: document.getElementById('dcr').value,
	  info_host: document.getElementById('info_host').value,
	  info_port: document.getElementById('info_port').value,
	  mus_host: document.getElementById('mus_host').value,
	  mus_port: document.getElementById('mus_port').value,
	  reload: document.getElementById('reload').value,
	  site: document.getElementById('site').value,
	  prefix: document.getElementById('prefix').value,
	  fatal_error: document.getElementById('fatal_error').value,
	  external_variables: document.getElementById('external_variables').value,
	  external_texts: document.getElementById('external_texts').value,
	};
  
	setLoaderbyCustomConfig(customConfig);
	const inputs = document.querySelectorAll('.loader-config input');
	const config = {};
  
	inputs.forEach(input => {
	  config[input.id] = input.value;
	});
  
	localStorage.setItem('loaderConfig', JSON.stringify(config));
	document.getElementById('popup').style.display = 'none';
  });


  document.getElementById('countryBtn').addEventListener('click', function() {
	const popup = document.getElementById('countriesPopup');
	const currentCountryImg = this.querySelector('.avatar').src;
	const currentCountryCode = currentCountryImg.match(/images\/(.*).jpg/)[1];
	document.querySelectorAll('#countriesPopup .country').forEach(country => {
	  if (country.getAttribute('data-country') === currentCountryCode) {
		country.style.display = 'none';
	  } else {
		country.style.display = 'block';
	  }
	});
	popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
  });

  if (!localStorage.getItem('origins_hotel')) {
	localStorage.setItem('origins_hotel', 'us');
}

setLoaderbyCountryCode(countryCode);
setTimeout(() => {
	updateEmbedSize();
}, 500);