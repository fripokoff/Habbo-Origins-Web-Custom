var html = "";
var last_update = "";

function appendItems(items) {
	const container = document.getElementById('items');
	items.forEach(item => {
		const div = document.createElement('div');
		div.className = 'chat';
		div.innerHTML = `
	  <div class="row">
	  <div class="main-box">
		<img class="big-furni" src="${item.images}"/>
	  </div>
	  <div class="dialog left">
		<div class="row">
		  <div class="furni_icon">
			<img class="furni_icon" src="https://tc-api.serversia.com/img/club_sofa.png"/>
		  </div>
		  <div class="warning__title">${item.hcValue}</div>
		</div>
	  </div>
	  </div>`;
		container.appendChild(div);
	});
}

function getTraderClubValues()
{
	const extractedValues = [];
	fetch('https://tc-api.serversia.com/items')
    .then(response => {
      if (!response.ok) {
        throw new Error('Réseau de réponse non ok');
      }
      return response.json();
    })
    .then(data => {
		
		let updated_at = null;
		data.forEach(item => {
			let name = item.name;
			let colaValue = item.cola_val;
			let hcValue = item.hc_val;
			let image = item.image;
			updated_at = item.updated_at;
			extractedValues.push({
				name,
				colaValue,
				hcValue,
				images: image
			});
		});
		document.getElementById('webtrader').href="https://traderclub.gg/";
		document.getElementById('webtrader').text="Visit:traderclub.gg";
		setTimeout(() => {
			extractedValues.reverse()
			document.getElementById('loader').style.display = 'none';
			appendItems(extractedValues)
			document.getElementById('last-update').innerHTML = updated_at;
			fullscreenBtn.style.boxShadow = "";
		}, 1000);
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}
function getTradeValues(site)
{
	document.getElementById('loader').style.display = 'block';
	document.getElementById('items').innerHTML = '<div id="last-update" class="time"></div>';
	if(site === "traderclub")
	{
		getTraderClubValues();
	}
}

function refreshTradeValues()
{
	getTradeValues(document.getElementById('tradesites').value);
}

getTradeValues(document.getElementById('tradesites').value);

document.getElementById('tradesites').addEventListener('change', function() {
	getTradeValues(this.value);
  });