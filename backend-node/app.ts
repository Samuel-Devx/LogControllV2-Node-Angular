import { json } from 'body-parser';
import express from 'express';
import router from './src/routes/routes';

function createApplication(){
    const app = express();
     

    app.use(express.json());

    app.use("/api", router);

    return app;
}

export default createApplication;