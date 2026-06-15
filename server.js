import Fastify from 'fastify';
import { z } from 'zod';

// Validační schéma pro data autobusu
const BusStatusSchema = z.object({
  vehicleId: z.string(),
  timestamp: z.string(),
  soc: z.number(),
  status: z.string()
});

const fastify = Fastify({ logger: true });

// Hlavní endpoint
fastify.post('/v1/bus-status', async (request, reply) => {
  try {
    const data = BusStatusSchema.parse(request.body);
    console.log("💾 Úspěšně přijato a validováno:", data);
    return { status: 'success', vehicleId: data.vehicleId };
  } catch (err) {
    return reply.status(400).send({ error: 'Neplatná data' });
  }
});

// Spuštění serveru
try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' });
  console.log('🚀 Server běží na http://localhost:3000');
} catch (err) {
  console.error("Chyba při startu serveru:", err);
  process.exit(1);
}
