const map = L.map('map',{
  center: [43.64701, -79.39425],
  zoom: 15
  });

  let template = '<form id="popup-form">\
  <label for="input-name">Name:</label>\
  <input id="input-name" class="popup-input" type="text"/><br>\
  <label for="input-description">Description:</label/>\
  <input id="input-description" class="popup-input" type="text"/><br>\
  <label for="input-address">Address:</label/>\
  <input id="input-address" class="popup-input" type="text" /><br>\
  <button id="button-submit" type="button">Add Marker</button>\
  </form>';



  L.tileLayer('https://api.mapbox.com/styles/v1/antotm99/ckkufbk2v2rkf17pewagzbfdo/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW50b3RtOTkiLCJhIjoiY2trdWVueTNuMHJiNzJucnVvcmRvczBoNiJ9.xCn9pVxKwusP1dHXrOJhNA', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


  map.on('click', addMarkerInfo);


  let marker;

  function addMarkerInfo(e){
    // Add marker to map at click location; add popup window
    marker = new L.Marker(e.latlng, {draggable:true});
    map.addLayer(marker);
    marker.bindPopup(template).openPopup();
    console.log(e.latlng.lat);
    console.log(e.latlng.lng);
    console.log(template.popupInput);
  };

