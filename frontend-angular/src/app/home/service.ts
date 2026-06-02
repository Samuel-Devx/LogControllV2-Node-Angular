import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Products } from './products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  findById(id: number) {
    return this.http.get<Products>(`${this.apiUrl}/${id}`);
  }
  update(id: number | undefined, product: Products) {
    return this.http.put<Products>(`${this.apiUrl}/${id}`, product);
  }
  save(product: Products) {
    return this.http.post<Products>(this.apiUrl, product);
  }
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:4040/api/product';

   getProducts() {
       return this.http.get<Products[]>(this.apiUrl);
    }
   
 findByName(name: string): Observable<Products[]> {
  const params = new HttpParams()
    .set('name', name);

  return this.http.get<Products[]>(
    `${this.apiUrl}/name`,
    { params }
  );
}

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
