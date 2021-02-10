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
    content: `<form id="marker-form" action="/maps" method = "POST">
          <p>Create New Marker</p>
          <div>
            <input name="title" placeholder="Title" />
          </div>
          <div>
            <input type="text" name="description" placeholder="Description" />
          </div>
          <div>
            <input type="text" name="address" placeholder="Address" />
          </div>
          <div>
            <input type="text" name="image_url" placeholder="Image Url" />
          </div>
          <input type="hidden" name="user_id" value="1" />
          <input type="hidden" name="mapid" value="${1}" />
          <input type="hidden" name="lat" value="${marker.position.lat()}" />
          <input type="hidden" name="lng" value="${marker.position.lng()}" />
          <div>
            <button type="submit"><a href="/maps/">Create<a></button>
            <a id="login-form__cancel" href="/maps/">Cancel</a>
          </div>
        </form>
          `
  });
  google.maps.event.addListener(marker, 'click', function() {
    popup.open(map, this);
  });
};

$(document).on("submit", "#marker-form", function(evt) {
  evt.preventDefault();
  let markerData = {
    title: $(this.title).val(),
    description: $(this.description).val(),
    address: $(this.address).val(),
    image_url: $(this.image_url).val(),
    user_id: $(this.user_id).val(),
    map_id: $(this.mapid).val(),
    latitude: $(this.lat).val(),
    longitude: $(this.lng).val()
  };

  $.ajax({
    url: "/maps/:mapid",
    method: "POST",
    data: markerData
  }).then(data => {
    res.send(data);
  });
});



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
