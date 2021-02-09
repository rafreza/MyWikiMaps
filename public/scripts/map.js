window.initMap = mapid => {
  mapMaker("map");
};

const addMarker = (location, map) => {
  let marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: true
  });
  let popup = new google.maps.InfoWindow({
    content: 'hello'
  });
  google.maps.event.addListener(marker, 'click', function() {
    popup.open(map, this);
  });


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
