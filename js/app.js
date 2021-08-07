const ipAddressInput = document.querySelector('#ipaddress__input');
const ipaddress__button = document.querySelector('#ipaddress__button');
const ip_address = document.querySelector('#ip_address');
const ip_location = document.querySelector('#ip_location');
const ip_timezone = document.querySelector('#ip_timezone');
const ip_isp = document.querySelector('#ip_isp');

class App {
   #mymap;
   #marker;

   constructor() {
      this._render();

      ipaddress__button.addEventListener('click', this.searchIPAddress.bind(this));
   }

   _render() {
      this.#mymap = L.map('mapid').setView([51.505, -0.09], 13);

      L.tileLayer(
         'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
         {
            maxZoom: 18,
            attribution:
               'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
               'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
         }
      ).addTo(this.#mymap);
   }

   setMarker(lat, lng) {
      if (this.#marker) this.#mymap.removeLayer(this.#marker);
      this.#marker = L.marker([lat, lng]).addTo(this.#mymap);
   }

   setView(lat, lng) {
      this.#mymap.setView([lat, lng], 13);
   }

   searchIPAddress(e) {
      e.preventDefault();
      const ip = ipAddressInput.value;
      const api_key = 'at_jjjGOd10bqaqUwJeKrfiCWO9IPGqv';
      if (ip) {
         this._getIPInfo(ip, api_key);
      } else {
         alert('Please enter ip address..!');
      }
   }

   _getIPInfo(ip = '', api_key = '') {
      fetch(`https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ip}`)
         .then((res) => {
            if (!res.ok) {
               throw new Error(`Error ${res.status}: Something went wrong.`);
            }
            return res.json();
         })
         .then((data) => {
            if (data.error) throw new Error(`Error: ${data.reason}`);

            this._setInfoData(data);
            this.setMarker(data.location.lat, data.location.lng);
            this.setView(data.location.lat, data.location.lng);
         })
         .catch((err) =>
            alert(
               `${
                  err.message === 'Failed to fetch'
                     ? 'Disable AdBlocker \nor Check Your Internet Connection.'
                     : err.message
               } Try again!`
            )
         );
   }

   _setInfoData(ipData) {
      ip_address.textContent = ipData.ip;
      ip_location.textContent = ipData.location.city + ' ,' + ipData.location.country;
      ip_timezone.textContent = ipData.location.timezone;
      ip_isp.textContent = ipData.isp;
   }
}

const app = new App();
