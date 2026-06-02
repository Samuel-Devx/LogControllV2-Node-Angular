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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { Router } from '@angular/router';

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
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './seach.html',
  styleUrl: './seach.css',
})
export class Seach implements OnInit {
   products: Products[] = [];
  allProducts: Products[] = [];
  
  searchControl = new FormControl('');

  constructor(
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private service: Service,
    private messageService: MessageService,
    private router: Router
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

 deleteProduct(id: number): void {
  this.confirmationService.confirm({
    header: 'Confirmação',
    message: 'Deseja realmente excluir este produto?',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass: 'p-button-danger',
    rejectButtonStyleClass: 'p-button-secondary',
    accept: () => {
      this.service.delete(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto excluído com sucesso'
          });

          this.loadProducts(); 
        },

        error: (err) => {
          console.error(err);

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir produto'
          });
        }
      });
    },

    reject: () => {
      this.messageService.add({
        severity: 'info',
        summary: 'Cancelado',
        detail: 'Exclusão cancelada'
      });
    }
  });
}
  editProduct(id: number): void {
    console.log('clicou', id);

    this.router.navigate(['/home/edit', id]);
  }
  
  cols = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Produto' },
    { field: 'account', header: 'Account' },
    { field: 'sku', header: 'SKU' },
    { field: 'price', header: 'Preço' }
  ];
}
