import { Component, inject } from '@angular/core';
import { Header } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Products } from '../../home/products';
import { Service } from '../../home/service';
@Component({
  selector: 'app-table',
  imports: [
    TableModule
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  products: Products[] = [];
  private service = inject(Service);


  getProducts() {
  this.service.getProducts().subscribe({
    next: (data) => {
      setTimeout(() => {
        this.products = data;
      });
    },
    error: (error) => {
      console.error('Error fetching products:', error);
    }
  });
}

  ngOnInit() {
    this.getProducts();
  }

cols = [
  { field: 'id', header: 'ID' },
  { field: 'sku', header: 'SKU' },
  { field: 'account', header: 'Account' },
  { field: 'name', header: 'Produto' },
  { field: 'price', header: 'Preço' }
];
}
