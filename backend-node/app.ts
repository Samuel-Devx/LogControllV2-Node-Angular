import { json } from 'body-parser';
import express from 'express';
import router from './src/routes/routes';

function createApplication(){
    const app = express();


    app.get("/api", router)
    app.use(json());
    

    return app;
}

export default createApplication;