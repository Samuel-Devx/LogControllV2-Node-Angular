import { Component } from '@angular/core';

import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule, PanelMenu } from 'primeng/panelmenu';
import { RouterOutlet } from "@angular/router";
import { Sidebar } from "../../shared/sidebar/sidebar";

@Component({
  selector: 'app-home-log',
  imports: [
    DrawerModule,
    ButtonModule,
    RouterOutlet,
    PanelMenuModule,
    Sidebar
],
  templateUrl: './home-log.html',
  styleUrl: './home-log.css',
})
export class HomeLog {
     visible: boolean = false;
     items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Usuários',
      icon: 'pi pi-users',
      routerLink: '/users'
    },
    {
      label: 'Produtos',
      icon: 'pi pi-box',
      items: [
        {
          label: 'Listagem',
          routerLink: '/products'
        },
        {
          label: 'Novo Produto',
          routerLink: '/products/new'
        }
      ]
    },
    {
      label: 'Configurações',
      icon: 'pi pi-cog',
      routerLink: '/settings'
    }
  ];
}
