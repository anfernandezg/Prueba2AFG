import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

import {BodyLogin} from './../../interfaces/BodyLogin';
import {UserLogeado} from '../../interfaces/UserLogeado';

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


  constructor(
    private http: HttpClient
  ) { 

  }
//mis variables
  public iniciarSesion (nombreusuario: string, contrasena: string){
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
    } );
    }

  }

