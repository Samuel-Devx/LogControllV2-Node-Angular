import { Component } from '@angular/core';
import { Header } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-seach',
  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './seach.html',
  styleUrl: './seach.css',
})
export class Seach {
   products = [
  { id: 1, name: 'Mouse Gamer', price: 120, account: 12, sku: 'ASD1233' },
  { id: 2, name: 'Teclado Mecânico', price: 350, account: 15, sku: 'QWE4567' },
  { id: 3, name: 'Monitor 24"', price: 899, account: 18, sku: 'ZXC7890' },
  { id: 4, name: 'Notebook Dell', price: 4200, account: 20, sku: 'RTY1122' },
  { id: 5, name: 'Headset HyperX', price: 280, account: 11, sku: 'FGH3344' },
  { id: 6, name: 'SSD 1TB', price: 430, account: 14, sku: 'JKL5566' },
  { id: 7, name: 'RTX 4060', price: 2800, account: 25, sku: 'BNM7788' },
  { id: 8, name: 'Fonte 750W', price: 470, account: 19, sku: 'UIO9900' },
  { id: 9, name: 'Gabinete RGB', price: 380, account: 13, sku: 'PAS2233' },
  { id: 10, name: 'Controle PS5', price: 450, account: 16, sku: 'LKJ4455' }
];

cols = [
  { field: 'id', header: 'ID' },
  { field: 'sku', header: 'SKU' },
  { field: 'account', header: 'Account' },
  { field: 'name', header: 'Produto' },
  { field: 'price', header: 'Preço' }
];
}
