import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { vw_sale } from '../dto/vw-sale';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  
   private http = inject(HttpClient);
  private apiUrl = 'http://localhost:4040/api/sale';

    getSale() {
      return this.http.get<vw_sale[]>(this.apiUrl);
    }



     
}
