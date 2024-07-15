var html = "";
var last_update = "";

function appendItems(items) {
	const container = document.getElementById('items');
	items.forEach(item => {
		const div = document.createElement('div');
		div.className = 'chat';
		div.innerHTML = `
	  <div class="row rare-row">
		<div class="main-box">
			<img class="big-furni" src="${item.images}"/>
		</div>
		<div class="left">
			<div class="row">
				<div class="warning__title">
					${item.hcValue}
					<span class="warning__title__text">HC(s)</span>
				</div>
			</div>
		</div>
	  </div>`;
		container.appendChild(div);
	});
}

function fetchValues(url, callback) {
	const extractedValues = [];
	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			let updated_at = null;
			data.forEach(item => {
				let name = item.name || item.furni_name;
				let colaValue = item.cola_val || item.colaValue;
				let hcValue = item.hc_val || item.hcValue;
				let image = item.image || item.images;
				updated_at = item.updated_at || item.last_update;
				extractedValues.push({
					name,
					colaValue,
					hcValue,
					images: image
				});
			});
			callback(extractedValues, updated_at);
		})
		.catch(error => console.error('Error fetching data:', error));
}

function getTraderClubValues(callback) {
	const url = 'https://tc-api.serversia.com/items';
	fetchValues(url, callback);
}

function getDucketValues(callback) {
	const url = 'https://www.ducket.net/api/furni/values';
	fetchValues(url, callback);
}

function getTradeValues(site) {
	document.getElementById('loader').style.display = 'block';
	document.getElementById('items').innerHTML = '<div id="last-update" class="time"></div>';
	let fetchFunction;

	if (site === "traderclub") {
		fetchFunction = getTraderClubValues;
		document.getElementById('webtrader').href = "https://traderclub.gg/";
		document.getElementById('webtrader').text = "Visit: traderclub.gg";
	} else if (site === "ducket") {
		fetchFunction = getDucketValues;
		document.getElementById('webtrader').href = "https://ducket.net/";
		document.getElementById('webtrader').text = "Visit: ducket.net";
	} else {
		console.error('Unknown site:', site);
		document.getElementById('loader').style.display = 'none';
		return;
	}

	fetchFunction((extractedValues, updated_at) => {
		setTimeout(() => {
			extractedValues.reverse();
			document.getElementById('loader').style.display = 'none';
			appendItems(extractedValues);
			document.getElementById('last-update').innerHTML = updated_at;
			fullscreenBtn.style.boxShadow = "";
		}, 1000);
	});
}

function refreshTradeValues() {
	getTradeValues(document.getElementById('tradesites').value);
}

getTradeValues(document.getElementById('tradesites').value);

document.getElementById('tradesites').addEventListener('change', function () {
	getTradeValues(this.value);
});
