
// define access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Ftc2FtbXVycGh5IiwiYSI6ImNqN2hkdmd0NDFoNGoyd28ycXNha2gwNngifQ.3m5UZyo8_nhxg-s2-tHe8Q';

//create map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/samsammurphy/cjckynk1r02572rqqeau7myi4' // map style URL from Mapbox Studio
});

// wait for map to load before adjusting it
map.on('load', function () {

    // force map to be occupy this area
    var mapDiv = document.getElementById('map');
    mapDiv.style.width = '100%';
    mapDiv.style.height = '400px';
    map.resize();

    // make a pointer cursor
    map.getCanvas().style.cursor = 'default';

    // set map bounds to the continental US
    map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);

    // make a pointer cursor
    map.getCanvas().style.cursor = 'default';

    // change info window as mouse hovers over state
    map.on('mousemove', function (e) {
        var states = map.queryRenderedFeatures(e.point, {
            layers: ['statedata']
        });

        if (states.length > 0) {
            document.getElementById('pd').innerHTML = "<h3><strong>" + states[0].properties.name + "</strong></h3><p><strong><em>" + states[0].properties.acres_burned + "</strong> acres burned</em></p>";
        } else {
            document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
        }
    });

    // define layer names
    // var layers = ['0-10,000', '10,000-20,000', '20,000-50,000', '50,000-100,000', '100,000-200,000', '200,000-500,000', '500,000-1,000,000', '1,000,000+'];
    // var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

    // create legend
    // for (i = 0; i < layers.length; i++) {
    //     var layer = layers[i];
    //     var color = colors[i];
    //     var item = document.createElement('div');
    //     var key = document.createElement('span');
    //     key.className = 'legend-key';
    //     key.style.backgroundColor = color;

    //     var value = document.createElement('span');
    //     value.innerHTML = layer;
    //     item.appendChild(key);
    //     item.appendChild(value);
    //     legend.appendChild(item);
    // }



    // disable map zoom when using scroll
    map.scrollZoom.disable();

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

});