var html = "";
var last_update = "";
let habboColaHcValue = 0;

  function convertHcToCola(hcValue, colaClubvalue) {
	const hcValueNum = parseFloat(hcValue);
	const colaClubvalueNum = parseFloat(colaClubvalue);
	let result = hcValueNum * colaClubvalueNum;
	result = Math.round(result * 4) / 4;
	if (result < 0.125) {
	  result = 0;
	}
  
	return result;
  }

function extractValuesFromHTML(html) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const items = doc.querySelectorAll('.grid-item');
	const extractedValues = [];
	items.forEach(item => {
		const name = item.querySelector('h2').innerText;
		let colaValue = item.querySelector('.cola-value') ? item.querySelector('.cola-value').innerText : 'N/A';
		let hcValue = item.querySelector('.hc-value') ? item.querySelector('.hc-value').innerText : 'N/A';
		const images = item.querySelectorAll('img');
		const imageUrls = Array.from(images).map(img => {
			const parts = img.src.split('/');
			const imgsIndex = parts.indexOf('imgs');
			return parts.slice(imgsIndex).join('/');
		  });
		  if(name === "Habbo Cola")
			{
				colaValue = "1";
			}
			else if(name === "Club Sofa")
			{
				hcValue = "1";
			}
		extractedValues.push({
			name,
			colaValue,
			hcValue,
			images: "https://originvalues.com/" + imageUrls[0]
		});
	});
	let item = extractedValues.find(item => item.name === "Habbo Cola");
	let hcval = item ? parseFloat(item.hcValue) : null;
	if(hcval)
		{
			habboColaHcValue = hcval;
		}
		extractedValues.forEach(item => {
			if(item.name !== "Habbo Cola") {
				item.colaValue = convertHcToCola(item.hcValue, habboColaHcValue);
			}
		});
	return extractedValues;
}

function getOriginValues() {
	if(last_update)
	{
		document.getElementById('last-update').innerHTML = last_update;
	}
	const fullscreenBtn = document.getElementById('refreshBtn');
	fullscreenBtn.style.boxShadow = "inset 2px 2px 0px 0px #905700, inset 0px 2px 0px 0px #e0aa00, inset 0px 0px 0px 2px #582400, inset 0px -2px 0px 0px #582400, inset 0px 0px 0px 0px #905700";
	fetch('https://originvalues.com/')
		.then(response => response.text())
		.then(html => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			const xpath1 = '/html/body/table/tbody/tr/td/table[3]/tbody/tr/td/table[2]/tbody/tr/td[3]/table/tbody/tr/td/div[1]';
			const xpath2 = '/html/body/table/tbody/tr/td/table[3]/tbody/tr/td/table[2]/tbody/tr/td[3]/table/tbody/tr/td/div[2]';
			const xpath3 = '/html/body/table/tbody/tr/td/table[3]/tbody/tr/td/table[2]/tbody/tr/td[3]/table/tbody/tr/td/center';
			function extractContentByXPath(doc, xpath) {
				if (doc instanceof Document && doc.evaluate) {
					const result = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
					return result.singleNodeValue ? result.singleNodeValue.innerHTML : 'Contenu non trouvé';
				} else {
					console.error("L'objet 'doc' n'est pas un document valide.");
					return 'Contenu non trouvé';
				}
			}
			let rares = extractContentByXPath(doc, xpath1);
			let club = extractContentByXPath(doc, xpath2);
			let updateText = extractContentByXPath(doc, xpath3);
			const dateRegex = /Updated: (\w+) (\d+)th, (\d+) at (\d+:\d+PM EST)/;
			const matches = updateText.match(dateRegex);
			if (matches) {
				const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				const month = matches[1];
				const day = matches[2];
				const year = matches[3];
				const time = matches[4];
				const monthNumber = (monthNames.indexOf(month) + 1).toString().padStart(2, '0');
				const formattedDay = day.padStart(2, '0');
				last_update = `${monthNumber}/${formattedDay}/${year} ${time}`;
				document.getElementById('last-update').innerHTML = last_update;
			} else {
				console.log("La date n'a pas pu être extraite.");
			}
			rares = extractValuesFromHTML(rares);
			club = extractValuesFromHTML(club);
			document.getElementById('webtrader').href="https://originvalues.com/";
			document.getElementById('webtrader').text="Visit:originvalues.com";
			setTimeout(() => {
				document.getElementById('loader').style.display = 'none';
				appendItems(rares)
				appendItems(club)
				fullscreenBtn.style.boxShadow = "";
			}, 1000);
			
		})
		.catch(error => console.error('Erreur lors de la récupération des données:', error));
}

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
			<img class="furni_icon" src="https://originvalues.com/imgs/furni/habbo_cola.png"/>
		  </div>
		  <div class="warning__title">${item.colaValue}</div>
		</div>
		<div class="row">
		  <div class="furni_icon">
			<img class="furni_icon" src="https://originvalues.com/imgs/hc_icon.png"/>
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
		let hcval = parseFloat(data.find(item => item.name === "Cola Machine")?.hc_val || null);
		data.forEach(item => {
			let name = item.name;
			let colaValue = convertHcToCola(item.hc_val, hcval);
			let hcValue = item.hc_val;
			let image = item.image;
			console.log(name, colaValue, hcValue, image)
			extractedValues.push({
				name,
				colaValue,
				hcValue,
				images: image
			});
		});
		document.getElementById('webtrader').href="https://traderclub.gg/";
		document.getElementById('webtrader').text="Visit:traderclub.gg";
		document.getElementById('last-update').innerHTML = "Soon";
		setTimeout(() => {
			document.getElementById('loader').style.display = 'none';
			appendItems(extractedValues)
			fullscreenBtn.style.boxShadow = "";
		}, 1000);
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}
//ddd
function getTradeValues(site)
{
	document.getElementById('loader').style.display = 'block';
	document.getElementById('items').innerHTML = '<div id="last-update" class="time"></div>';
	if(site === "originvalues")
	{
		getOriginValues();
	}else if(site === "traderclub")
	{
		getTraderClubValues();
	}
}

getTradeValues(document.getElementById('tradesites').value);

document.getElementById('tradesites').addEventListener('change', function() {
	getTradeValues(this.value);
  });