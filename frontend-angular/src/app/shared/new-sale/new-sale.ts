import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Select } from 'primeng/select';;
import { MessageService } from 'primeng/api';

import { SaleItemInput } from '../dto/saleInput';
import { Products } from '../../home/products';
import { SaleService } from '../sale/sale-service';

interface SaleLine {
  product: Products | null;
  quantity: number;
}

@Component({
  selector: 'app-new-sale',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    Select,
  ],
  templateUrl: './new-sale.html',
  styleUrl: './new-sale.css'
})
export class NewSale implements OnInit {

  products: Products[] = [];
  lines: SaleLine[] = [];

  constructor(
    private service: SaleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.showError('Não foi possível carregar os produtos')
    });
    this.addLine();
  }

  addLine(): void {
    this.lines.push({ product: null, quantity: 1 });
  }

  removeLine(index: number): void {
    this.lines.splice(index, 1);
  }

  get total(): number {
    return this.lines.reduce((sum, l) => sum + ((l.product?.price ?? 0) * l.quantity), 0);
  }

  getMaxQuantity(line: SaleLine): number {
    return line.product?.account ?? 0;
 }
 canSubmit(): boolean {
  return this.lines.every(line => 
    line.product && 
    line.quantity > 0 && 
    line.quantity <= (line.product.account ?? 0)
  );
}
get availableProducts(): Products[] {
  return this.products.filter(p => p.account > 0);
}
  createSale(): void {
    if (!this.validateForm()) return;

    const payload: SaleItemInput[] = this.lines.map(l => ({
      productId: l.product!.id!,
      quantity: l.quantity,
      unitPrice: l.product!.price,

    }));
    console.log(payload);
    this.service.createSale(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Venda criada com sucesso' });
        this.clearForm();
      },
      error: (err: any) => {
        console.error(err);
        this.showError('Não foi possível criar a venda');
      }
    });
  }

  clearForm(): void {
    this.lines = [];
    this.addLine();
  }

  private validateForm(): boolean {
    if (this.lines.length === 0) {
      this.showError('Adicione ao menos um produto');
      return false;
    }
    for (let i = 0; i < this.lines.length; i++) {
      const l = this.lines[i];
      if (!l.product) {
        this.showError(`Linha ${i + 1}: selecione um produto`);
        return false;
      }
      if (!l.quantity || l.quantity <= 0) {
        this.showError(`Linha ${i + 1}: quantidade deve ser maior que zero`);
        return false;
      }
    }
    return true;
  }

  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: message });
  }
}