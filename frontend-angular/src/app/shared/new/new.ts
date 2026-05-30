import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Products } from '../../home/products';
import { Service } from '../../home/service';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    FormsModule,

    InputTextModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,

    CardModule,
    ButtonModule,

    ToastModule
  ],

  providers: [MessageService],

  templateUrl: './new.html',
  styleUrls: ['./new.css']
})
export class New {
  
  
 
  product: Products = {
    id: 0,
    name: '',
    account: 0,
    sku: '',
    price: 0
  };

  

  
  constructor(
    private service: Service,
    private messageService: MessageService,
   
  ) {}
  

createProduct(): void {

  if (!this.product.sku?.trim()) {
    this.showError('SKU é obrigatório');
    return;
  }

  if (this.product.sku.length < 3) {
    this.showError('SKU deve ter no mínimo 3 caracteres');
    return;
  }

  if (!this.product.account || this.product.account <= 0) {
    this.showError('Quantidade deve ser maior que zero');
    return;
  }

  if (!this.product.name?.trim()) {
    this.showError('Nome do produto é obrigatório');
    return;
  }

  if (!this.product.price || this.product.price <= 0) {
    this.showError('Preço deve ser maior que zero');
    return;
  }

  if (this.product.price > 1000000) {
    this.showError('Preço deve ser menor que 1.000.000');
    return;
  }

  this.service.save(this.product).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Produto criado com sucesso'
      });

      this.clearForm();
    },
    error: (err) => {
      console.error('Erro ao salvar produto:', err);

      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível salvar o produto'
      });
    }
  });
}

private showError(message: string): void {
  this.messageService.add({
    severity: 'error',
    summary: 'Erro',
    detail: message
  });
}

  clearForm(): void {

    this.product = {
      id: 0,
      name: '',
      account: 0,
      sku: '',
      price: 0
    };
  }
}