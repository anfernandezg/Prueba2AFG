//src>app>begin-sesion>begin-sesion.page.ts
import { Component } from '@angular/core';
import {ViewWillEnter, ViewDidEnter} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './../servicio/auth/auth.service';//importamos el servicio 
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-begin-sesion',
  templateUrl: './begin-sesion.page.html',
  styleUrls: ['./begin-sesion.page.scss'],
})
//cuando la pagina entre quiero iniciar 
export class BeginSesionPage implements ViewWillEnter {
  rememberMe: boolean = false; // Inicializa la propiedad rememberMe con false por defecto

public formulario!: FormGroup;
public cargando_bloqueo : boolean = false; // va a partir en falso
private subCargando!: Subscription;

//aqui inyectamos los servicios
  constructor(
    private fb: FormBuilder,
    private  auth: AuthService
  ) { 
    this.formulario = fb.group({
      //recibira texto vacio inicialmente
      usuario:['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      rememberMe: [false], //definimos rememberMe en el formulario
    })
  }
  //metodo para validar en el submit que todo este correcto
  public validarFormulario () {
    const esValido = this.formulario.valid;
    if (!esValido){
      return;
    }
    const datos = this.formulario.getRawValue();
    const usuario = datos ['usuario'];
    const contrasena = datos ['contrasena'];
    this.auth.iniciarSesion(usuario,contrasena);
  }
//metodo publico
  public ionViewWillEnter(): void {
    this.subCargando = this.auth.cargando.subscribe(nuevoValor =>{
     this.cargando_bloqueo = nuevoValor; 
    })
  }
  public ionViewDidLeave():void {
    if (this.subCargando){
      this.subCargando.unsubscribe();
    }

  }

}
