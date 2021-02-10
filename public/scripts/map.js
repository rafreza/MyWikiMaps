

window.initMap = () => {
  const markers = {};
  let markerId;
  const tdot = { lat: 43.6532, lng: -79.3832};
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: tdot
  });

  google.maps.event.addListener(map, "click", (e) => {
    addMarker(e.latLng, map);
  });

};

const deleteMarker = function(markerId) {

}
let mapId = window.location.pathname.substring(window.location.pathname.lastIndexOf('1'));
console.log("mapId:", mapId);
const addMarker = (location, map) => {

  let marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: true
  });


  let popup = new google.maps.InfoWindow({
    content: `<form id="marker-form" action="maps/${mapId}" method = "POST">
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
          <input type="hidden" name="mapid" value="${mapId}" />
          <input type="hidden" name="lat" value="${marker.position.lat()}" />
          <input type="hidden" name="lng" value="${marker.position.lng()}" />
          <div>
            <button type="submit">Create</button>
            <a id="login-form__cancel" href="/maps/">Cancel</a>
          </div>
        </form>
          `
  });
  google.maps.event.addListener(marker, 'click', function() {

    popup.open(map, this);
  });
};

$('#marker-form').submit(function(e) {
  e.preventDefault();
  console.log("mapId:", mapId);
  $.ajax({
    url: `maps/${mapId}`,
    type: 'POST',
    data: data,
    success: function(){
      console.log('success!');
    }
  })

});




