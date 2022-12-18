import express from 'express';
import http from 'node:http';
import mongoose from 'mongoose';
import path from 'node:path';
import { Server } from 'socket.io';

import { router } from './router';

const app = express();
const server = http.createServer(app);
const port = 3001;

export const io = new Server(server);

mongoose.set('strictQuery', false);

//https://stackoverflow.com/questions/46523321/mongoerror-connect-econnrefused-127-0-0-127017
mongoose.connect('mongodb://0.0.0.0:27017/prosdescolados');
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(`Erro ao conectar no Mongo DB. Erro: ${error}`);
});

database.once('connected', () => {
    console.log('Conectado ao Mongo');
});

//Liberando os headers para consumo da api pelos app e fe
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*'); //Wildcard * (libera tudo)
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();
});

//Para que ao acessar a pasta uploads, ser sempre estático
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(express.json());

//Usando as rotas
app.use(router);

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});



