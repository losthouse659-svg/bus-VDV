import Fastify from 'fastify';
import { BusStatusSchema } from './models'; // Import našeho validátoru

const fastify = Fastify({ logger: true });

// Endpoint pro příjem dat o stavu autobusu
fastify.post('/v1/bus-status', {
  schema: {
    body: {
      type: 'object',
      properties: {
        vehicleId: { type: 'string' },
        timestamp: { type: 'string', format: 'date-time' },
        soc: { type: 'number' },
        status: { type: 'string' },
        temperature: { type: 'number' }
      },
      required: ['vehicleId', 'timestamp', 'soc', 'status']
    }
  }
}, async (request, reply) => {
  try {
    // Zde probíhá validace pomocí našeho schématu z models.ts
    const data = BusStatusSchema.parse(request.body);
    
    // ZDE BUDE LOGIKA: Uložení do databáze nebo odeslání dál
    fastify.log.info(`Přijata data z vozidla: ${data.vehicleId}, SoC: ${data.soc}%`);
    
    return { status: 'success', received: data.vehicleId };
  } catch (err) {
    fastify.log.error(err);
    reply.status(400).send({ error: 'Neplatný formát dat VDV' });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server běží na http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
