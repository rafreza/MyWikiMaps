$(document).ready(() => {
  window.initMap = (markers) => {
    let centerMap;
    if (markers.length > 0) {
      centerMap = { lat: parseFloat(markers[0].latitude), lng:parseFloat(markers[0].longitude)};
    } else {
      centerMap = { lat: 43.6532, lng: -79.3832 }
    }

    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: centerMap
    });
    for (let marker of markers) {
      console.log(marker);
      if (marker){
        const m = addExistingMarker({
          lat: parseFloat(marker.latitude),
          lng: parseFloat(marker.longitude)
        }, map);

        let info = new google.maps.InfoWindow({
          content: `
          <p><b>${marker.title}</b><p>
          <p>Description: ${marker.description}<p>
          <p>Address: ${marker.address}<p>
          <p>image_url: ${marker.image_url}<p>
          `,
        });
        google.maps.event.addListener(m,'click', function(e) {
          info.open(map, this);
        })
      }
    }

    $(document).on("submit", "#marker-form", (function(e) {
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

    }));



    google.maps.event.addListener(map, "click", (e) => {
      for (let marker of markers) {
        if (e.latLng.lng() !== parseFloat(marker.latitude)){
          addNewMarker(e.latLng, map);
          break;
        };
      }

    });

  };


  let mapId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
  const newMapId = mapId.slice(1);

  const addExistingMarker = (location, map) => {
    let existingMarker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: false
    });
    return existingMarker;
  }

  const addNewMarker = (location, map) => {
    let newMarker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: false
    });
    google.maps.event.addListener(newMarker, 'click', function() {
      let popup = new google.maps.InfoWindow({
        content:
        `<form id="marker-form" action=`+`/maps/${newMapId}`+` method = "POST">
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
            <input type="hidden" name="lat" value="${newMarker.position.lat()}" />
            <input type="hidden" name="lng" value="${newMarker.position.lng()}" />
          <div>
            <button>Create</button>
          </div>
        </form>
        `
      });
      popup.open(map, this);
    });
  };


});
