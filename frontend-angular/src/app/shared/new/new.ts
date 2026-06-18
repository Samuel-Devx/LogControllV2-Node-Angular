import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    TableModule
  ],
  providers: [MessageService],
  templateUrl: './new.html',
  styleUrls: ['./new.css']
})
export class New implements OnInit {

  isEditMode = false;

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadProduct(Number(id));
    }
  }

  loadProduct(id: number): void {
    this.service.findById(id).subscribe({
      next: (product: Products) => {
        this.product = {
          ...product,
          sku: String(product.sku ?? '') // garante que chega como string
        };
      },
      error: () => {
        this.showError('Produto não encontrado');
      }
    });
  }

  saveProduct(): void {
    if (!this.validateForm()) return;

    const payload: Products = {
      ...this.product,
      sku: String(this.product.sku).trim() // garante string ao salvar
    };

    const request = this.isEditMode
      ? this.service.update(payload.id, payload)
      : this.service.save(payload);

    request.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: this.isEditMode ? 'Produto atualizado com sucesso' : 'Produto criado com sucesso'
        });
        if (!this.isEditMode) this.clearForm();
      },
      error: () => {
        this.showError('Não foi possível salvar o produto');
      }
    });
  }

  private validateForm(): boolean {
    const sku = String(this.product.sku ?? '').trim();

    if (!sku) {
      this.showError('SKU é obrigatório');
      return false;
    }

    if (sku.length < 3) {
      this.showError('SKU deve ter no mínimo 3 caracteres');
      return false;
    }

    if (!this.product.account || this.product.account <= 0) {
      this.showError('Quantidade deve ser maior que zero');
      return false;
    }

    if (!this.product.name?.trim()) {
      this.showError('Nome do produto é obrigatório');
      return false;
    }

    if (!this.product.price || this.product.price <= 0) {
      this.showError('Preço deve ser maior que zero');
      return false;
    }

    if (this.product.price > 1000000) {
      this.showError('Preço deve ser menor que 1.000.000');
      return false;
    }

    return true;
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