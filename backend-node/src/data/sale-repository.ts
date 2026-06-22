import { db } from "./database";
import { SqlQuery } from "../utils/sqlQuery";
import { SaleItemInput } from "../model/saleItem";

export const createSale = async (items: SaleItemInput[]) => {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        for (const item of items) {
            const [rows]: any = await connection.query(
                'SELECT account FROM product WHERE id = ?',
                [item.productId]
            );

            if (!rows[0]) {
                throw new Error(`Produto ${item.productId} não encontrado`);
            }

            const currentStock = rows[0].account ?? 0;

            if (currentStock < item.quantity) {
                throw new Error(`Estoque insuficiente para o produto ${item.productId}. Disponível: ${currentStock}`);
            }
        }

        const totalPrice = items.reduce((sum, item) => {
            const price = Number(item.unitPrice) || 0;
            const qty = Number(item.quantity) || 0;
            return sum + (price * qty);
        }, 0);

        const result: any = await connection.query(
            SqlQuery.INSERTSALE,
            [totalPrice]
        );
        const saleId = result[0]?.insertId || result.insertId;

        for (const item of items) {
            const subtotal = item.unitPrice * item.quantity;

            await connection.query(
                SqlQuery.INSERTITEM,
                [saleId, item.productId, item.quantity, item.unitPrice, subtotal]
            );

            await connection.query(
                SqlQuery.UPDATESTOQUE,
                [item.quantity, item.productId, item.quantity]
            );

            await connection.query(
                SqlQuery.DELETESTOCK,  // vírgula aqui
                [item.productId]
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

export const vw_sale = async () => {
    const [sales]: any = await db.query(
        SqlQuery.VWSALE
    );
    return sales;
};