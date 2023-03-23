import express from 'express';
import UserRouter from '../Router/UserRouter.js';
import EventRouter from '../Router/EventRouter.js';
import GuestRouter from '../Router/GuestRouter.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const App = express();
const Port = 8000 || process.env.Port;

App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());
App.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT']
}));
App.use(UserRouter);
App.use(EventRouter);
App.use(GuestRouter);

App.listen(Port, () => {
    console.log(`Example app listening on port ${Port}`)
})