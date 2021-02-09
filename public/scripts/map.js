// Initialize and add the map
function initMap() {
    // The location of DKcenter
    let DKcoor = {lat: -34.742750, lng: 138.660641};
    // The map, centered bit to the side of Dkcenter
    let map = new google.maps.Map(
      document.getElementById('map'), {zoom: 13, center: DKcoor});
    // The marker, positioned at dk center
    let marker = new google.maps.Marker({
    position: DKcoor,
    map: map,
    title:'Main\n10 Trimmer Rd.\nElizabeth South\nSouth Australia\n5112'
  })
  let marker2 = new google.maps.Marker({
    position: {lat: -34.731211, lng: 138.660750},
    map: map,
    title:'Dance Studio\n6 Chivell.\nElizabeth South\nSouth Australia\n5112'
  });
  //infowindow -iw Main Building
  let contentString =
      '<h3> Main Building </h3>'
      +'<p>'
      +	'mobile: <a href="tel:0411 421 945">0411 421 945</a> <br>'
      +	'email: <a href="mailto:davidjgarrard@bigpond.com"> davidjgarrard@bigpond.com </a><br>'
      +	'address: <a href="#" onclick="centerMap()">10 Trimmer Rd.</a>'
      +'</p>'
    ;

  let infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  //infowindow -iw Dance Studio
  let contentString2 =
    '<h3> Dance Studio </h3>'
    +'<p>'
    +	'mobile: <a href="tel:0411 421 945">0411 421 945</a> <br>'
    +	'email: <a href="mailto:davidjgarrard@bigpond.com"> davidjgarrard@bigpond.com </a><br>'
    +	'address: <a href="#" onclick="centerMap()">6 Chivell St.</a>'
    +'</p>'
  ;

  let infowindow2 = new google.maps.InfoWindow({
    content: contentString2
  });

  marker2.addListener('click', function() {
    infowindow2.open(map, marker2);
  });
}
