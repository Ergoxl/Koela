// Kontrollime, kas fail on laaditud
console.log("Map.js loaded");

// Defineerime juhtringi globaalse muutujana
var guideCircle;

// Loome kaardi ja seadistame algvaate
var map = L.map('map').setView([58.5953, 25.0136], 7);
console.log("Map initialized with center:", map.getCenter());

// Lisame OpenStreetMap plaadid kaardile
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Loome juhtringi ja lisame selle kaardile
guideCircle = L.circle(map.getCenter(), {
    radius: 4,          // Ringi raadius meetrites
    color: 'blue',      // Juhtringi värv
    fillOpacity: 0.2,   // Läbipaistvus
}).addTo(map);
console.log("Guide circle added at center:", map.getCenter());

// Liigutame juhtringi kaardi keskpunkti
map.on('move', function () {
    guideCircle.setLatLng(map.getCenter());
    console.log("Guide circle moved to:", map.getCenter());
});
