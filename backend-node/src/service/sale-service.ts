import * as repository from "../data/sale-repository"
import { Sale } from "../model/sale";
import { SaleItem, SaleItemInput } from "../model/saleItem";
import * as Httpresponse from '../utils/httpReponse'



export const save = async (body: SaleItemInput[]) => {
    

    if (!Array.isArray(body) || body.length === 0) {
        return Httpresponse.BadResquest();
    }
    
    try {
        await repository.createSale(body);
        return Httpresponse.Created();
    } catch (error) {
        console.error("Erro na Transação do Banco:", error); 
        return Httpresponse.ServerError(); 
    }
}

export const listSale = async () => {
    const sales = await repository.vw_sale();
    let response = null;    
    if(sales.length !== 0) response = Httpresponse.Ok(sales);
    else response = Httpresponse.NotFound();
    return response;
}