var mymap = '';

window.addEventListener('load', () => {
   mymap = L.map('mapid').setView([51.505, -0.09], 13);

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
   ).addTo(mymap);
});

document.querySelector('#ipaddress__button').addEventListener('click', () => {
   const ipAddressInput = document.querySelector('#ipaddress__input');
   const ip_address = document.querySelector('#ip_address');
   const ip_location = document.querySelector('#ip_location');
   const ip_timezone = document.querySelector('#ip_timezone');
   const ip_isp = document.querySelector('#ip_isp');

   let isFound = true;

   var ip = ipAddressInput.value;
   var api_key = 'at_jjjGOd10bqaqUwJeKrfiCWO9IPGqv';
   $(function () {
      $.ajax({
         url: 'https://geo.ipify.org/api/v1',
         data: { apiKey: api_key, ipAddress: ip },
         success: function (response) {
            console.log(response);
            // const data = ;
            //   $('#mapid').append('<pre>' + JSON.stringify(data, '', 2) + '</pre>');
            // console.log(data.ip);
            // console.log(data);

            ip_address.textContent = ip;
            ip_location.textContent =
               response.location.city + ' ,' + response.location.country;
            ip_timezone.textContent = response.location.timezone;
            ip_isp.textContent = response.isp;

            // L.map('mapid').setView([51.505, -0.09], 13);
            L.marker([response.location.lat, response.location.lng]).addTo(mymap);
            mymap.setView([response.location.lat, response.location.lng], 13);
         },
         error: function (err) {
            alert('Please enter propert Ip Address.');
            isFound = false;
            ipAddressInput.value = '';
         },
      });
   });
});
