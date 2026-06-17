import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { SaleItemInput } from '../dto/saleInput';
import { SaleService } from '../sale/sale-service';

@Component({
  selector: 'app-new-sale',
  providers: [MessageService],
  imports: [
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    TableModule,
    RouterModule
  ],
  templateUrl: './new-sale.html',
  styleUrl: './new-sale.css',
})
export class NewSale {

  sale: SaleItemInput = {
    productId: 0,
    quantity: 0,
    unitPrice: 0
}
  

  constructor(
    private service: SaleService,
    private messageService: MessageService,
  ) {}
    
  
  createSale(): void {


      const request =  this.service.createSale(this.sale);

    request.subscribe({
      next: () => {

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail:  'Sale criado com sucesso'
        });

      },
      error: (err: any) => {

        console.error(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível salvar o produto'
        });
      }
    });
  }

  

}


