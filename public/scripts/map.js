
$(document).ready(() => {
  window.initMap = () => {
    const markers = {};
    let markerId;
    const tdot = { lat: 43.6532, lng: -79.3832};
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: tdot
    });
    $(document).on("submit", (function(e) {
      e.preventDefault();
      console.log(e);
      const data = {
        title: e.target.title.value,
        description: e.target.description.value,
        address: e.target.address.value,
        image_url: e.target.image_url.value,
        map_id: e.target.mapid.value,
        lat: e.target.lat.value,
        lng: e.target.lng.value
      }

      $.ajax({
        url: `/maps/${newMapId}`,
        type: 'POST',
        data: data,
      })
      .done(function(res){

        console.log(data, res);

      });
    }));

    google.maps.event.addListener(map, "click", (e) => {
      addMarker(e.latLng, map);
    });

  };
  window.initMap();

  let mapId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
  const newMapId = mapId.slice(1);
  console.log("mapId:", newMapId);


  const addMarker = (location, map) => {

    let marker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true
    });


    let popup = new google.maps.InfoWindow({
      content: `<form id="marker-form" action=`+`/maps/${newMapId}`+` method = "POST">
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
            <input type="hidden" name="mapid" value="${newMapId}" />
            <input type="hidden" name="lat" value="${marker.position.lat()}" />
            <input type="hidden" name="lng" value="${marker.position.lng()}" />
            <div>
              <button>Create</button>
              <a id="login-form__cancel">Cancel</a>
            </div>
          </form>
          <script>console.log('hello!');</script>
            `
    });
    google.maps.event.addListener(marker, 'click', function() {

      popup.open(map, this);

      $('#marker-form').submit(function(e) {
        e.preventDefault();
        debugger;
        console.log("mapId:", newMapId);

        $.ajax({
          url: `/maps${newMapId}`,
          type: 'POST',
          data: data,
        })
        .done(function(res){

          console.log('test!', res);

        });


      });
    });
    google.maps.event.addListener(marker, 'submit', evt => {
      evt.preventDefault();
    });
  };


});






