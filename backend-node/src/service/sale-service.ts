import * as repository from "../data/sale-repository"
import { Sale } from "../model/sale";
import { SaleItem, SaleItemInput } from "../model/saleItem";
import { BadResquest, Created } from "../utils/httpReponse";



export const save = async (body: SaleItemInput[]) => {
 if (!Array.isArray(body) || body.length === 0) {
        return BadResquest();
    }
    await repository.createSale(body)
    return Created();
}