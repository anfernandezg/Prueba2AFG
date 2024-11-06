import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeginSesionPage } from './begin-sesion.page';

const routes: Routes = [
  {
    path: '',
    component: BeginSesionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeginSesionPageRoutingModule {}
