import { saveBusStatus } from './db';
import { BusStatus } from './models';

export const processBusTelemetry = async (data: BusStatus) => {
  // 1. Uložíme data do databáze
  await saveBusStatus(data);
  
  // 2. Logika: Kontrola kritického stavu
  if (data.soc < 20) {
    console.warn(`[ALERT] Vozidlo ${data.vehicleId} má kriticky nízký SoC: ${data.soc}%`);
    // Zde byste mohli zavolat funkci pro odeslání notifikace (Slack, Email, atd.)
    await triggerLowBatteryAlert(data);
  }

  // 3. Logika: Detekce anomálií (např. přehřátí)
  if (data.temperature && data.temperature > 60) {
    console.error(`[CRITICAL] Přehřátí baterie u vozidla ${data.vehicleId}: ${data.temperature}°C`);
  }
};

async function triggerLowBatteryAlert(data: BusStatus) {
  // Implementace notifikace (např. volání API pro push notifikaci)
  console.log(`Notifikace odeslána: Autobus ${data.vehicleId} potřebuje nabít.`);
}
