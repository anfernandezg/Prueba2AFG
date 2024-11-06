import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeginSesionPageRoutingModule } from './begin-sesion-routing.module';

import { BeginSesionPage } from './begin-sesion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    BeginSesionPageRoutingModule
  ],
  declarations: [BeginSesionPage]
})
export class BeginSesionPageModule {}
