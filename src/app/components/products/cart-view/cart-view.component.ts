import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { ShipmentService } from 'src/app/Services/shipment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
})
export class CartViewComponent implements OnInit {
  cartsProduct: any = [];
  totalPay: number = 0;
  qtyInsert: any;

  constructor(private shareData: ShipmentService) {}

  ngOnInit(): void {
    this.shareData.getviewCart().subscribe({
      next: (info) => {
        if (info !== '') {
          info.forEach((element: any) => {
            this.cartsProduct.push({
              id: element.id,
              name: element.name,
              barcode: element.barcode,
              salePrice: element.salePrice,
              amount: element.amount,
              qty: 1,
              total: element.salePrice,
              imagen: element.imagen,
            });
          });
          this.totalBuy();
        }
      },
    });
  }

  DeleteItem(id: number) {
    let index = this.cartsProduct.findIndex((x: { id: number }) => x.id === id);
    this.cartsProduct.splice(index, 1);
    this.totalBuy();
  }

  qtyValue($event: any) {
    this.qtyInsert = $event.target.value;
    console.log('Value', this.qtyInsert);
    let productId = Number($event.target.attributes.id.value);
    let amount = Number($event.target.attributes.max.value);
    if (Number(this.qtyInsert) > amount) {
      Swal.fire(
        'La cantidad ingresada debe ser menor o igual a: ',
        String(amount)
      );
      return;
    }
    let pCart = this.cartsProduct.find(
      (x: { id: number }) => x.id === productId
    );
    pCart.qty = Number(this.qtyInsert);
    pCart.total = pCart.qty * pCart.salePrice;
    this.totalBuy();
  }

  totalBuy() {
    if (this.cartsProduct.length > 0) {
      this.totalPay = this.cartsProduct
        .map(function (c: any) {
          return c.total;
        })
        .reduce(function (total: any, b: any) {
          return total + b;
        });
    } else {
      this.totalPay = 0;
    }
  }

  onClick($event: any) {
    this.qtyInsert = $event.target.value;
    let productId = Number($event.target.attributes.id.value);
    let amount = Number($event.target.attributes.max.value);
    if (Number(this.qtyInsert) > amount) {
      Swal.fire(
        'La cantidad ingresada debe ser menor o igual a: ',
        String(amount)
      );
      return;
    }
    let pCart = this.cartsProduct.find(
      (x: { id: number }) => x.id === productId
    );
    pCart.qty = Number(this.qtyInsert);
    pCart.total = pCart.qty * pCart.salePrice;
    this.totalBuy();
  }
}
