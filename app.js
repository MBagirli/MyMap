let CurrentLatitude;
let CurrentLongitude;
let allData = [];
let input = document.querySelector('.container__info__inputs--input');
let btn = document.querySelector('.container__info__inputs--btn');
let container__info__results = document.querySelector('.container__info__results');

fetch('https://restcountries.com/v3.1/all').then(promise => promise.json()).then(data => allData = [...data]);

google.maps.event.addDomListener(window, 'load', init);

btn.addEventListener('click', function () {
  for (let i = 0; i < allData.length; i++) {
    if (input.value.toLowerCase().trim() == allData[i].name.common.toLowerCase()) {
      for (let j = 0; j < allData[i].continents.length; j++) {
        if (allData[i].continents[j] == 'Asia' || allData[i].continents[j] == 'Europe') {
          allData[i].continents = 'Eurasia';
        }
      }
      console.log(allData[i].continents);
      let html = `
        <img src="${allData[i].flags.png}" alt="Flag" class="container__info__results--img">
        <p class="container__info__results--p">Continent : ${allData[i].continents}</p>
        <p class="container__info__results--p">Region : ${allData[i].region}</p>
        <p class="container__info__results--p">Capital : ${allData[i].capital}</p>
        <p class="container__info__results--p">Language : ${Object.values(allData[i].languages)}</p>
        <p class="container__info__results--p">Population : ${allData[i].population}</p>
      `;
      container__info__results.innerHTML = html;

      CurrentLatitude = allData[i].latlng[0];
      CurrentLongitude = allData[i].latlng[1];
      init();
      break;
    } else {
      container__info__results.innerHTML = "<h2>Not Found!</h2>";
    }
  }
});

function init() {

  var mapOptions = {

    zoom: 5,

    center: new google.maps.LatLng(CurrentLatitude, CurrentLongitude),

    styles: [{
      "featureType": "all",
      "elementType": "labels.text",
      "stylers": [{
        "color": "#878787"
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "color": "#f9f5ed"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [{
        "color": "#f5f5f5"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#c9c9c9"
      }]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "color": "#aee0f4"
      }]
    }]
  };


  var mapElement = document.querySelector('.container__map');

  var map = new google.maps.Map(mapElement, mapOptions);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(CurrentLatitude, CurrentLongitude),
    map: map,
    title: 'Snazzy!'
  });
}