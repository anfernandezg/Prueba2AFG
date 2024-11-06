import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

import {BodyLogin} from './../../interfaces/BodyLogin';
import {UserLogeado} from '../../interfaces/UserLogeado';

//un observador que permita bloquear formulario y añada un boton  visual de cargando en la pagina
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';

//este servicio se inyecta en root y vive una sola vez
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login';
  //variables publicas de tipo UserLogeado o Null
  public userLogeado : UserLogeado | null = null
  
  //usare el token aqui
  public accesToken: string | null = null;
  //observador de cargando
  private $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router

  ) { 

  }
//mis variables
  public iniciarSesion (nombreusuario: string, contrasena: string){
    //observable
    this.$cargando.next(true);
    const body ={
      username: nombreusuario,
      password: contrasena
    }
    //para traer la informacion del UserLogeado
    this.http.post<UserLogeado>(this.URL_LOGIN, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .subscribe (mi_observador => {
      this.accesToken = mi_observador.acessToken;
      this.userLogeado = mi_observador;
      console.log(mi_observador, 200);
      this.router.navigate(['/','productos']);//si el usuario ingresa de forma correcta esto lo lleva a la pagina de producto
      //observador
      this.$cargando.next(false);
    } );
    }

    // Se crea el metodo para cerrar sesion
    public cerrarSesion(){
      if (this.userLogeado){
        this.userLogeado = null;
        this.accesToken = null;
      }
    }


  }

