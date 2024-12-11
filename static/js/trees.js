// Kontrollime, kas fail on laaditud
console.log("Trees.js loaded");

// Defineerime kihid puude haldamiseks
var treeLayer = L.layerGroup().addTo(map);

// Alustab puude loendamist, registreerides kaardi klikke
function startTreeCounting(ringID) {
    console.log("startTreeCounting called for ring:", ringID);

    map.on('click', function (e) {
        var ring = ringsLayer.getLayer(ringID);
        var distance = map.distance(ring.getLatLng(), e.latlng); // Kontrollib kaugust ringist
        if (distance <= ring.getRadius()) {
            var marker = L.marker(e.latlng).addTo(treeLayer); // Lisab puu markerina
            console.log("Tree marker added at:", e.latlng);
        } else {
            console.log("Click outside ring, no tree marker added.");
        }
    });
}

// Eemaldab viimase lisatud puu markerina
function removeLastTree() {
    console.log("removeLastTree called");
    var lastMarker = treeLayer.getLayers().pop();
    if (lastMarker) {
        treeLayer.removeLayer(lastMarker);
        console.log("Last tree marker removed");
    }
}
