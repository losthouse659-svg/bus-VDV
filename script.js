// Inicializace mapy (vycentrováno na jižní Moravu / Brno)
const map = L.map('map').setView([49.1951, 16.6068], 11);

// Načtení mapových dlaždic (OpenStreetMap vzhled)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap přispěvatelé'
}).addTo(map);

async function updateMap() {
    try {
        const response = await fetch('./spoje.json');
        const data = await response.json();
        
        document.getElementById('status').innerText = `Aktualizováno v: ${new Date().toLocaleTimeString()}`;

        // Projdeme všechny autobusy v souboru a hodíme je na mapu
        data.forEach(bus => {
            if (bus.lat && bus.lng) {
                L.marker([bus.lat, bus.lng])
                    .addTo(map)
                    .bindPopup(`<b>${bus.vehicleId}</b><br>Stav: ${bus.status}`);
            }
        });
    } catch (err) {
        document.getElementById('status').innerText = 'Chyba při načítání souboru spoje.json';
        console.error("Nepodařilo se načíst GPS data:", err);
    }
}

// Spustit hned po načtení stránky
updateMap();
