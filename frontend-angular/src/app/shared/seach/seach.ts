import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs';

import { Service } from '../../home/service';
import { Products } from '../../home/products';

@Component({
  selector: 'app-seach',
  standalone: true,

  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ],

  templateUrl: './seach.html',
  styleUrl: './seach.css',
})

export class Seach implements OnInit {

  products: Products[] = [];

  searchControl = new FormControl('');

  constructor(private service: Service) {}

  ngOnInit(): void {

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {

        if (value && value.trim() !== '') {

          this.service.findByName(value)
            .subscribe({

              next: (response) => {
                this.products = response;
              },

              error: (err) => {
                console.error(err);
              }

            });

        } else {

          this.products = [];

        }

      });
  }

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'sku', header: 'SKU' },
    { field: 'account', header: 'Account' },
    { field: 'name', header: 'Produto' },
    { field: 'price', header: 'Preço' }
  ];
}