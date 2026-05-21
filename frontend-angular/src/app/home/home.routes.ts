import { Routes } from "@angular/router";
import { Table } from "../shared/table/table";
import { Seach } from "../shared/seach/seach";
import { New } from "../shared/new/new";




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
  }

];
