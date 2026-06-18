import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { vw_sale } from '../dto/vw-sale';
import { SaleService } from './sale-service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { SaleGroup } from '../dto/sele-group';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-sale',
  imports: [
    CardModule,
    CommonModule,
    TagModule,
    ButtonModule,
    DividerModule,
    RouterModule,
    DialogModule,
  ],
  templateUrl: './sale.html',
  styleUrl: './sale.css',
})
export class Sale implements OnInit {
  sale: vw_sale[] = [];
  sales: SaleGroup[] = [];

  selectedItem: vw_sale | null = null;
  showDialog = false;

  private service = inject(SaleService);
  private cd = inject(ChangeDetectorRef);

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  ngOnInit(): void {
    this.getSaleAll();
  }

  getSaleAll(): void {
    this.service.getSale().subscribe({
      next: (data) => {
        this.sale = [...data];
        this.sales = this.groupBySale(data);
        this.cd.detectChanges();
      },
      error: (error) => console.error(error),
    });
  }

  openDetails(item: vw_sale): void {
    this.selectedItem = item;
    this.showDialog = true;
  }

  closeDetails(): void {
    this.showDialog = false;
    this.selectedItem = null;
  }

  private groupBySale(rows: vw_sale[]): SaleGroup[] {
    const map = new Map<number, SaleGroup>();

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