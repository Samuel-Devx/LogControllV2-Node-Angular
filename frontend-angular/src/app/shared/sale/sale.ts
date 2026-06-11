import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { vw_sale } from '../dto/vw-sale';
import { SaleService } from './sale-service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterOutlet } from "@angular/router";
import { RouterModule } from '@angular/router';

//Refaatorar External
export interface SaleGroup {
  saleId: number;
  saleDate: Date;
  totalPrice: number;
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
}


@Component({
  selector: 'app-sale',
  imports: [
    CardModule,
    CommonModule,
    TagModule,
    ButtonModule,
    DividerModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './sale.html',
  styleUrl: './sale.css',
})
export class Sale {
newSale() {
throw new Error('Method not implemented.');
}
    sale: vw_sale[] = [];
    sales: SaleGroup[] = [];

    private service = inject(SaleService)
   
    formatCurrency(value: number): string {
        return new Intl.NumberFormat('pt-BR', {
       style: 'currency',
      currency: 'BRL'
     }).format(value);
    } 
    ngOnInit(): void {
      this.getSale();
      this.getSaleAll();
    }

    getSale(): void {
      this.service.getSale().subscribe({
      next: (data) => {
        this.sale = [...data];

       
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
getSaleAll(): void {
  
  this.service.getSale().subscribe({
    next: (data) => {
      this.sales = this.groupBySale(data); // era this.sale = [...data]
      
    },
    error: (error) => console.error(error),
  });
}

private groupBySale(rows: vw_sale[]): SaleGroup[] {
  const map = new Map<number, SaleGroup>();
  console.log('primeiro row:', rows[0]); 
  for (const row of rows) {
    if (!map.has(row.sale_id)) {
      map.set(row.sale_id, {
        saleId: row.sale_id,
        saleDate: row.sale_date,
        totalPrice: Number(row.total_price),
        items: [],
      });
    }

    map.get(row.sale_id)!.items.push({
      productName: row.name,
      quantity: row.quantity,
      unitPrice: Number(row.unit_price),
    });
  }

  return Array.from(map.values());
}




}
