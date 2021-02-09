const addMarker = (location, map) => {
  let marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: true
  });
};

window.initMap = mapid => {
  mapMaker("map");
};

const mapMaker = (mapid) => {
  const tdot = { lat: 43.6532, lng: -79.3832};
  let map = new google.maps.Map(document.getElementById(mapid), {
    zoom: 13,
    center: tdot
  });

  google.maps.event.addListener(map, "click", (e) => {
    addMarker(e.latLng, map);
  });

};
