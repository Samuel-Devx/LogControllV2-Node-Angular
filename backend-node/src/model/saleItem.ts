export interface SaleItem {
    id: number;
    saleId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
}
export interface SaleItemInput {
    productId: number;
    quantity: number;
    unitPrice: number;
}