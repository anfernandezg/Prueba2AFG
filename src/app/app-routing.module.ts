import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
