// Kontrollime, kas fail on laaditud
console.log("Utils.js loaded");

// Arvutab kahe punkti vahelise kauguse meetrites
function calculateDistance(latlng1, latlng2) {
    return map.distance(latlng1, latlng2);
}

// Lähtestab kõik kihid ja andmed
function resetMap(layers) {
    layers.forEach(layer => layer.clearLayers());
    console.log("Map has been reset");
}
