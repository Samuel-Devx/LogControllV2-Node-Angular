import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule, PanelMenu } from 'primeng/panelmenu';
import { RouterOutlet } from "@angular/router";
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
@Component({
  selector: 'app-sidebar',
  imports: [
    DrawerModule,
    ButtonModule,
    PanelMenuModule,
    RouterModule,
],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

}
