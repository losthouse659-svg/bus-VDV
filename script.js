async function loadBusData() {
    try {
        // Načte lokální soubor spoje.json, který aktualizuje ten Python skript
        const response = await fetch('./spoje.json');
        const data = await response.json();
        
        const list = document.getElementById('bus-list');
        const status = document.getElementById('status');
        list.innerHTML = '';
        status.innerText = 'Aktuální spoje:';

        // Tady jen zkušebně vypíšeme data do seznamu
        console.log("Data z bráchova souboru:", data);
        
        // Pokud je data pole, vypíše je, jinak ukáže surový objekt
        if (Array.isArray(data)) {
            data.forEach(bus => {
                const li = document.createElement('li');
                li.innerText = `Bus ${bus.vehicleId || 'Neznámý'} - Spoj: ${bus.status || 'OK'}`;
                list.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.innerText = "Data úspěšně načtena. Podívej se do konzole (F12).";
            list.appendChild(li);
        }
    } catch (err) {
        document.getElementById('status').innerText = 'Čekám na vygenerování souboru spoje.json...';
        console.log("Zatím nemáš stažený soubor spoje.json nebo je prázdný.");
    }
}

loadBusData();
