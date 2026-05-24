import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Products } from './products';

@Injectable({
  providedIn: 'root',
})
export class Service {
    private http = inject(HttpClient);

   getProducts() {
       return this.http.get<Products[]>('http://localhost:4040/api/product');
    }

    
}
