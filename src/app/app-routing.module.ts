import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {loginGuard} from './guard/login.guard';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'begin-sesion',
    pathMatch: 'full'
  },
  {
    path: 'begin-sesion',
    loadChildren: () => import('./begin-sesion/begin-sesion.module').then( m => m.BeginSesionPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule),
    canActivate: [loginGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
