import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { routes } from './routes';

const app = Fastify({ logger: true });
dotenv.config();

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ error: error.message });
})

const start = async () => {
    app.register(cors);
    app.register(routes);

    try{
        await app.listen({ port: 3333, host: "0.0.0.0"})
        console.log('Server running on port 3333');
    }catch(err){
        console.log(err);
    }

}

start();