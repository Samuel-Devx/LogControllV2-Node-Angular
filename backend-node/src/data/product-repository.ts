import { Product } from '../model/product';
import { SqlQuery } from "../utils/sqlQuery";
import {db} from "./database";


export const create = async (product: Product ) => {
    const [result]: any = await db.query(
        SqlQuery.SAVEPRODUCT, 
        [product.name, product.price, product.account, product.sku]
    );
    return result.insertId;
}

export const listAll = async () => {
     const [products]: any = await db.query(
        SqlQuery.FINDALL
     )
     return products; 
}

export const listById = async (id:number) => {
    const [result]: any = await db.query(
        SqlQuery.FINDBYID, 
        [id]
    );
    return result;
}

export const listByName = async (name: string) => {
    const [result]: any = await db.query(
        SqlQuery.FINDBYNAME, 
        [`${name}%`]
    );
    return result;
}

export const deleteById = async (id: number) => {
    const [result]: any = await db.query(
        SqlQuery.DELETEBYID,
        [id]
    );
    return result.affectedRows > 0;
}
