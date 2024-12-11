// Kontrollime, kas fail on laaditud
console.log("UI.js loaded");

// Lisa nupp "Lisa mõõtering"
var addCircleControl = L.control({ position: 'topright' });
addCircleControl.onAdd = function () {
    var div = L.DomUtil.create('div', 'leaflet-control-custom');
    div.innerHTML = 'Lisa mõõtering';
    div.style.backgroundColor = 'white';
    div.style.padding = '5px';
    div.style.cursor = 'pointer';

    div.onclick = function () {
        addMeasurementCircle();
    };

    return div;
};
addCircleControl.addTo(map);

// Loome staatilise menüü haldamiseks
var ringMenuControl = L.control({ position: 'topright' });
ringMenuControl.onAdd = function () {
    var div = L.DomUtil.create('div', 'custom-menu');
    div.style.display = 'none'; // Menüü peidetakse vaikimisi
    return div;
};
ringMenuControl.addTo(map);

// Loome tabeli mõõtmistulemuste kuvamiseks
function createResultsTable() {
    var container = document.createElement('div');
    container.id = 'results-container';
    container.innerHTML = `
        <h3>Mõõtmistulemused</h3>
        <table id="results-table">
            <thead>
                <tr>
                    <th>Ringi nimi</th>
                    <th>Puid kokku</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;
    document.body.appendChild(container);
}
createResultsTable();
