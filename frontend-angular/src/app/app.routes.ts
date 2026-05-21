import { Routes } from '@angular/router';
import { HomeLog } from './home/home-log/home-log';

export const routes: Routes = [
 {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.routes')
        .then(m => m.homeroutes)
  }


]
