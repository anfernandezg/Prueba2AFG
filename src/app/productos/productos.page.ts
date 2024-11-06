import { Component } from '@angular/core';
import { ProductoService } from './../servicio/producto/producto.service';
import { Producto } from './../interfaces/Producto';
import { ViewWillEnter, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements ViewWillEnter, ViewDidEnter {
  productos: Producto[] = []; // Aquí almacenaremos los productos

  constructor(private productoService: ProductoService) {}

  // Este método se ejecutará cada vez que la página esté a punto de entrar
  ionViewWillEnter(): void {
    console.log('ProductosPage va a entrar en la vista');
    // Nos suscribimos al BehaviorSubject del servicio para recibir los productos
    this.productoService.producto.subscribe((datos) => {
      this.productos = datos;
    });

    // Carga inicial de productos
    this.productoService.cargarProductos('inicial');
  }

  // Este método se ejecutará después de que la página haya entrado completamente
  ionViewDidEnter(): void {
    console.log('ProductosPage ya ha entrado en la vista');
  }

  // Método que se llama al alcanzar el final del scroll para cargar más productos
  loadMoreProducts(event: any) {
    this.productoService.cargarProductos('siguiente');

    // Asegurarse de que el evento se complete cuando se hayan cargado los datos
    setTimeout(() => {
      event.target.complete();

      // Si no hay más productos para cargar, desactivar el infinite scroll
      if (this.productos.length >= this.productoService.total) {
        event.target.disabled = true;
      }
    }, 500); // El timeout ayuda a simular el tiempo que tarda la carga
  }

  // Método para refrescar manualmente la lista de productos
  doRefresh(event: any) {
    this.productoService.cargarProductos('inicial');
    setTimeout(() => {
      event.target.complete(); // Completa la acción del refresher
    }, 1000);
  }
}
