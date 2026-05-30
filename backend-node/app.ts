import { json } from 'body-parser';
import express from 'express';
import router from './src/routes/routes';

function createApplication(){
    const app = express();
    const cors = require('cors');

    app.use(cors({
        origin: 'http://localhost:4200'
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api", router);

    return app;
}

export default createApplication;