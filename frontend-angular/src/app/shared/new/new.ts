import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    private messageService: MessageService
  ) {}

  createProduct(): void {

    this.service.save(this.product).subscribe({

      next: () => {

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product created successfully'
        });

        this.clearForm();
      },

      error: (err: any) => {

        console.error(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create product'
        });
      }
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