import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs';

import { Service } from '../../home/service';
import { Products } from '../../home/products';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-seach',
  standalone: true,

  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    RippleModule,
  ],
  providers: [MessageService],
  templateUrl: './seach.html',
  styleUrl: './seach.css',
})
export class Seach implements OnInit {
   products: Products[] = [];
  allProducts: Products[] = [];
  
  searchControl = new FormControl('');

  constructor(
    private cd: ChangeDetectorRef,
    private service: Service,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

  
    this.loadProducts();

  
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {

  
        if (!value || value.trim() === '') {
          this.products = [...this.allProducts];
          return;
        }


        this.products = this.allProducts.filter(product =>
          product.name.toLowerCase().includes(value.toLowerCase())
        );

        if (this.products.length === 0) {
          this.messageService.add({
            severity: 'info',
            summary: 'No Results',
            detail: 'No products found matching your search'
          });
        }
      });
  }

  loadProducts(): void {
    this.service.getProducts().subscribe({
      next: (response) => {
        this.allProducts = response;
        this.products = [...response];

        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {

        this.products =
          this.products.filter(product => product.id !== id);

        this.allProducts =
          this.allProducts.filter(product => product.id !== id);

        this.messageService.add({
          severity: 'success',
          summary: 'Product Deleted',
          detail: 'The product has been deleted successfully'
        });
      },

      error: (err: any) => {
        console.error(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while deleting the product'
        });
      },
    });
  }

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Produto' },
    { field: 'account', header: 'Account' },
    { field: 'sku', header: 'SKU' },
    { field: 'price', header: 'Preço' }
  ];
}
