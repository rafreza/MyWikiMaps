const map = L.mapbox.map('map')
.setView([40, -74.50], 9)
.addLayer(L.mapbox.styleLayer('mapbox://styles/antotm99/ckkufbk2v2rkf17pewagzbfdo'));




      // const map = L.map('map',{
      //   center: [43.64701, -79.39425],
      //   zoom: 15
      //   });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const map2 = L.map('map2',{
        center: [43.64701, -79.39425],
        zoom: 15
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map2);




