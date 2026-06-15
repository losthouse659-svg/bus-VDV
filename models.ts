import { z } from "zod";

// Enum pro stavy nabíjení
export enum ChargeStatus {
  IDLE = "IDLE",
  CHARGING = "CHARGING",
  FINISHED = "FINISHED",
  ERROR = "ERROR",
}

// Validátor pro zprávu o stavu (Runtime validace)
export const BusStatusSchema = z.object({
  vehicleId: z.string().min(3).max(20),
  timestamp: z.string().datetime(), // ISO 8601
  soc: z.number().min(0).max(100),
  status: z.nativeEnum(ChargeStatus),
  temperature: z.number().optional(),
});

// TypeScript typ vygenerovaný z validátoru
export type BusStatus = z.infer<typeof BusStatusSchema>;

// Příklad použití pro validaci příchozího JSONu
export function validateBusStatus(data: unknown): BusStatus {
  return BusStatusSchema.parse(data);
}
