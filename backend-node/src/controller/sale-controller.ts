import { json } from 'body-parser';
import { Request, Response } from "express";
import  * as service from "../service/sale-service"
import { findByName, findById } from '../service/product-service';


export const save = async (req: Request, res: Response) => {
    const bodyValor = req.body;
    const HttpResponse = await service.save(bodyValor);
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}



export const listSale = async (req: Request, res: Response) => {
    const HttpResponse = await service.listSale();
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}

