import { db } from "./database";
import { SqlQuery } from "../utils/sqlQuery";
import { SaleItem, SaleItemInput } from "../model/saleItem";





export const createSale = async (items: SaleItemInput[]) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Calcula o total geral
        const totalPrice = items.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity, 0
        );

        // 2. Cria o registro da venda
        const [saleResult]: any = await connection.query(
            SqlQuery.INSERTSALE,
            [totalPrice]
        );
        const saleId = saleResult.insertId;

        // 3. Insere cada item e atualiza o estoque
        for (const item of items) {
            const subtotal = item.unitPrice * item.quantity;

            await connection.query(
                SqlQuery.INSERTITEM,
                [saleId, item.productId, item.quantity, item.unitPrice, subtotal]
            );

            await connection.query(
                SqlQuery.UPDATESTOQUE,
                [item.quantity, item.productId]
            );
        }

        await connection.commit();
        return saleId;

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

