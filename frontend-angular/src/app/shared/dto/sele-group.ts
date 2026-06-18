export interface SaleGroup {
  saleId: number;
  saleDate: Date;
  totalPrice: number;
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
}
