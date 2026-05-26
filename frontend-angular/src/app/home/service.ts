import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Products } from './products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:4040/api/product';

   getProducts() {
       return this.http.get<Products[]>('http://localhost:4040/api/product');
    }
   
 findByName(name: string): Observable<Products[]> {

  const params = new HttpParams()
    .set('name', name);

  return this.http.get<Products[]>(
    'http://localhost:4040/api/product/name',
    { params }
  );
}
}
