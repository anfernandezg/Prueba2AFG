//src>app>servicio>producto>producto.service.ts
import { Injectable } from '@angular/core';
import { Producto } from './../../interfaces/Producto';
import { ProductoRespuesta } from './../../interfaces/ProductoRespuesta';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly URL_PRODUCTOS = 'https://dummyjson.com/auth/products';
  
  private saltar = 0;
  private cantidad = 30;
  public total = 0;
  private $productos = new BehaviorSubject<Producto[]>([]);
  public producto = this.$productos.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  public cargarProductos(direccion: 'siguiente' | 'anterior' | 'inicial') {
    if (direccion === 'siguiente') {
      this.saltar += this.cantidad;
    } else if (direccion === 'anterior') {
      this.saltar = Math.max(0, this.saltar - this.cantidad);
    } else {
      this.saltar = 0;
    }

    const url_nueva = `${this.URL_PRODUCTOS}?limit=${this.cantidad}&skip=${this.saltar}`;
    this.http.get<ProductoRespuesta>(url_nueva, {
      headers: {
        'Authorization': 'Bearer '+this.auth.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe({
      next: (datos) => {
        const nuevosProductos = [...this.$productos.getValue(), ...datos.products];
        this.$productos.next(nuevosProductos);
        this.total = datos.total;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }
}
