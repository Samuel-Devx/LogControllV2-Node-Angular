import { Product } from "../model/product";
import * as repository from "../data/product-repository"
import { BadResquest, Created, noContent, NotFound, Ok } from '../utils/httpReponse';




export const save = async (body: Product) => {
    if(body && Object.keys(body).length !== 0){
        await repository.create(body);
        return Created();
    }else {
        return BadResquest();
    }
}


export const list = async () => {
    const products = await repository.listAll();
    let response = null;    
    if(products.length !== 0) response = Ok(products);
    else response = NotFound();
    return response;
}

export const findByName= async (body: string) => {
    const data = await repository.listByName(body);
    let response = null
    if(data.length !== 0) return response = Ok(data);
    else return response = noContent();
}

export const findById= async (id: number) => {
    const data = await repository.listById(id);
    let response = null
    if(data.length !== 0) return response = Ok(data);
    else return response = noContent();
}