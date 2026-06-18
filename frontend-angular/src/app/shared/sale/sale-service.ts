import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { vw_sale } from '../dto/vw-sale';
import { SaleItem } from '../dto/sale-item';
import { Sale } from '../dto/sale';
import { SaleItemInput } from '../dto/saleInput';
import { Products } from '../../home/products';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  
   private http = inject(HttpClient);
   private apiUrl = 'http://localhost:4040/api/sale';
    private productUrl = 'http://localhost:4040/api/product';

    getSale() {
      return this.http.get<vw_sale[]>(this.apiUrl);
    }

    createSale(sale: SaleItemInput[]){
      return this.http.post<Sale>(this.apiUrl, sale)
    }
     getProducts() {
      return this.http.get<Products[]>(this.productUrl);
    }

     
}
