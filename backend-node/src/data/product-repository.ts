import { Product } from '../model/product';
import { Sale } from '../model/sale';
import { SqlQuery } from "../utils/sqlQuery";
import {db} from "./database";


export const create = async (product: Product ) => {
    const [result]: any = await db.query(
        SqlQuery.SAVEPRODUCT, 
        [product.name, product.price, product.account, product.sku]
    );
    return result.insertId;
}
export  const update = async (id: number, product: Product) => {
    const [result]: any = await db.query(
        SqlQuery.UPDATEBYID,
        [product.name, product.price, product.account, product.sku, id]
    );
    return result.affectedRows > 0;
}
export const listAll = async () => {
     const [products]: any = await db.query(
        SqlQuery.FINDALL
     )
     return products; 
}

export const listById = async (id: number) => {

    const [rows]: any = await db.query(
        SqlQuery.FINDBYID,
        [id]
    );

    return rows[0];
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
export const createSale = async (total: number) => {

    const [result]: any = await db.query(
        `
        INSERT INTO sale (sale_date, total)
        VALUES (NOW(), ?)
        `,
        [total]
    );

    return result.insertId;
}


