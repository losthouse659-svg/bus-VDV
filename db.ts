import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveBusStatus = async (data: {
  vehicleId: string;
  soc: number;
  status: string;
  temperature?: number;
}) => {
  try {
    return await prisma.busTelemetry.create({
      data: {
        vehicleId: data.vehicleId,
        soc: data.soc,
        status: data.status,
        temperature: data.temperature,
      },
    });
  } catch (error) {
    console.error("Chyba při zápisu do databáze:", error);
    throw new Error("Nepodařilo se uložit data.");
  }
};
