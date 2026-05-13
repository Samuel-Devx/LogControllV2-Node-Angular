import { json } from 'body-parser';
import { Request, Response } from "express";
import  * as service from "../service/product-service"
import { findByName, findById } from '../service/product-service';



export const save = async (req: Request, res: Response) => {
    const bodyValor = req.body;
    const HttpResponse = await service.save(bodyValor);
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}

export const findAll = async (req: Request, res: Response) => {
    const HttpResponse = await service.list();
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}

export const findName = async (req: Request, res: Response) => {
    const bodyValor = req.query.name as string;
    const HttpResponse = await service.findByName(bodyValor);
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}
export const findId = async (req: Request, res: Response) => {
    const bodyValor = parseInt(String(req.params.id));
    const HttpResponse = await service.findById(bodyValor);
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}





