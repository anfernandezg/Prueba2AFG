import { Component, OnInit } from '@angular/core';
import { AuthService } from './../servicio/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductoRespuesta } from '../interfaces/Producto'; // Importa la interfaz

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos: ProductoRespuesta[] = []; // Usa la interfaz para tipar el array de productos
  skip: number = 0;
  limit: number = 30;
  
  total: number = 0;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(event?: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accesToken}`
    });

    // Usar la interfaz para definir el tipo de la respuesta esperada
    this.http.get<{ products: ProductoRespuesta[], total: number }>(`https://dummyjson.com/auth/products?limit=${this.limit}&skip=${this.skip}`, { headers })
      .subscribe(response => {
        this.productos = [...this.productos, ...response.products];
        this.total = response.total;

        if (event) {
          event.target.complete();
        }

        // Incrementa el valor de skip para la próxima solicitud
        this.skip += this.limit;

        // Deshabilita el infinite scroll si se han cargado todos los productos
        if (this.productos.length >= this.total) {
          event?.target.disabled = true;
        }
      }, error => {
        console.error('Error al cargar los productos:', error);
        if (event) {
          event.target.complete();
        }
      });
  }

  loadMoreProducts(event: any) {
    this.loadProducts(event);
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }
}
