// Kontrollime, kas fail on laaditud
console.log("Rings.js loaded");

var ringsLayer = L.layerGroup().addTo(map); // Mõõteringite kiht
var ringData = {}; // Andmestik ringide haldamiseks

// Lisab uue mõõteringi
function addMeasurementCircle() {
    console.log("addMeasurementCircle called");

    var center = guideCircle.getLatLng(); // Juhtringi keskpunkt
    var ring = L.circle(center, {
        radius: 4, // Ringi raadius meetrites
        color: 'green', // Aktiivse ringi värv
        fillOpacity: 0.3,
    }).addTo(ringsLayer);

    var ringID = L.stamp(ring); // Loome unikaalse ID
    ringData[ringID] = { layer: ring, status: 'active', trees: [], name: `Ring ${ringID}` }; // Salvestame andmed
    console.log("Measurement circle added with ID:", ringID);

    updateRingMenu(ringID, 'active'); // Kuvame menüü
}

// Kinnitab asukoha ja lubab puude loendamise
function confirmRingPosition(ringID) {
    console.log("confirmRingPosition called for ring:", ringID);

    var ring = ringsLayer.getLayer(ringID);
    ring.setStyle({ color: 'orange' }); // Muudame ringi oranžiks
    ringData[ringID].status = 'counting'; // Uuendame staatuse

    console.log("Ring position confirmed for tree counting:", ringID);

    updateRingMenu(ringID, 'counting'); // Uuendame menüü
}

// Lisab puu loendusse
function addTreeToRing(ringID, latlng) {
    console.log("addTreeToRing called for ring:", ringID, "at location:", latlng);

    var ring = ringsLayer.getLayer(ringID);
    var distance = map.distance(ring.getLatLng(), latlng); // Kontrollime, kas klikk on ringi sees
    if (distance <= ring.getRadius()) {
        ringData[ringID].trees.push(latlng); // Salvestame puu koordinaadid
        L.marker(latlng).addTo(ringsLayer); // Lisame puu markerina kaardile
        console.log("Tree added to ring:", ringID, "Total trees:", ringData[ringID].trees.length);

        updateResultsTable(); // Värskendame tabelit
    } else {
        console.log("Tree location outside the ring. Not added.");
    }
}

// Kinnitab loendamise ja lukustab ringi
function finalizeRing(ringID) {
    console.log("finalizeRing called for ring:", ringID);

    var ring = ringsLayer.getLayer(ringID);
    ring.setStyle({ color: 'red' }); // Muudame ringi punaseks
    ringData[ringID].status = 'finalized'; // Uuendame staatuse

    console.log("Tree counting finalized for ring:", ringID);

    updateRingMenu(null); // Peidame menüü
    updateResultsTable(); // Värskendame tabelit
}

// Värskendab tabelit
function updateResultsTable() {
    var tbody = document.querySelector('#results-table tbody');
    tbody.innerHTML = ''; // Tühjendame tabeli

    for (let ringID in ringData) {
        if (ringData[ringID].status === 'finalized' || ringData[ringID].status === 'counting') {
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${ringData[ringID].name}</td>
                <td>${ringData[ringID].trees.length}</td>
            `;
            tbody.appendChild(row);
        }
    }
}

// Eemaldab ringi
function removeRing(ringID) {
    console.log("removeRing called for ring:", ringID);

    ringsLayer.removeLayer(ringID); // Eemaldame kihilt
    delete ringData[ringID]; // Kustutame andmestikust
    console.log("Ring removed:", ringID);

    updateRingMenu(null); // Peidame menüü
    updateResultsTable(); // Värskendame tabelit
}

// Kuvab ja värskendab staatilist menüüd
function updateRingMenu(ringID, status) {
    var menuDiv = document.querySelector('.custom-menu');
    if (!menuDiv) return;

    if (ringID) {
        menuDiv.style.display = 'block';
        if (status === 'active') {
            menuDiv.innerHTML = `
                <button onclick="confirmRingPosition('${ringID}')">Kinnita asukoht ja loenda puid</button>
                <button onclick="removeRing('${ringID}')">Kustuta</button>
            `;
        } else if (status === 'counting') {
            menuDiv.innerHTML = `
                <button onclick="finalizeRing('${ringID}')">Kinnita loendamine</button>
                <button onclick="removeRing('${ringID}')">Kustuta</button>
                <p>Puid kokku: ${ringData[ringID].trees.length}</p>
            `;
        } else if (status === 'finalized') {
            menuDiv.style.display = 'none';
        }
    } else {
        menuDiv.style.display = 'none';
    }
}

// Aktiveerime puude lisamise funktsiooni ainult kinnitatud ringi puhul
map.on('click', function (e) {
    for (let ringID in ringData) {
        if (ringData[ringID].status === 'counting') {
            addTreeToRing(ringID, e.latlng); // Lisame puu ringi
            break;
        }
    }
});

// Muudame funktsioonid globaalseks
window.confirmRingPosition = confirmRingPosition;
window.finalizeRing = finalizeRing;
window.removeRing = removeRing;
window.updateRingMenu = updateRingMenu;
