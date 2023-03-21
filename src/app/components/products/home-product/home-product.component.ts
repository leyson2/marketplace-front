import { Component, inject } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { ShipmentService } from 'src/app/Services/shipment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.scss'],
})
export class HomeProductComponent {
  products: any = [];
  dataFilter: string = '';
  isLogin: boolean = false;
  private _produService = inject(ProductsService);
  private _envio = inject(ShipmentService);
  constructor() {}
  ngOnInit(): void {
    this.getProducts();
    this._envio.getInfo().subscribe({
      next: (info) => {
        if (info !== '') {
          this.dataFilter = info;
        }
      },
    });

    this._envio.getInfoLogin().subscribe({
      next: (info) => {
        if (info !== '') {
          this.isLogin = info;
        }
      },
    });
  }

  getProducts() {
    this._produService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  AddCart(id: number) {
    if (this.isLogin) {
      let data = this.products.find((x: { id: number }) => x.id == id);
      this._envio.setInformation(data);
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debe estar logueado, para agregar un producto al carrito.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
