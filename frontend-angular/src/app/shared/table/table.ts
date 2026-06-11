import {Component,OnInit,inject,ChangeDetectorRef} from '@angular/core';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Products } from '../../home/products';
import { Service } from '../../home/service';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, 
    TableModule,
    ButtonModule,
    InputTextModule,
    CurrencyPipe
  ],
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class Table implements OnInit {

  products: Products[] = [];

  private service = inject(Service);
  private cd = inject(ChangeDetectorRef);

  cols = [
    { field: 'name', header: 'Produto' },
    { field: 'account', header: 'Account' },
    { field: 'sku', header: 'SKU' },
    { field: 'price', header: 'Preço' }
  ];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.service.getProducts().subscribe({
      next: (data) => {
        this.products = [...data];

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}