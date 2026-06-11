import { Routes } from "@angular/router";
import { Table } from "../shared/table/table";
import { Seach } from "../shared/seach/seach";
import { New } from "../shared/new/new";
import { Sale } from "../shared/sale/sale";
import { NewSale } from "../shared/sale/new-sale/new-sale";




export const homeroutes: Routes = [


  {
    path: '',
    component: Table
  },
  {
    path: 'search',
    component: Seach
  },
  {
    path: 'new',
    component: New
  },
  {
    path: 'edit/:id',
    component: New
  },
  {
    path: 'sales',
    component: Sale
  },
  {
    path: 'sales/new',
    component: NewSale
  }

];
