import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategory } from 'src/app/interfaces/category';
import { CategorysService } from 'src/app/Services/categorys.service';
import { ShipmentService } from 'src/app/Services/shipment.service';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private _envio = inject(ShipmentService);
  ListProducts: any[] = [];
  search1: number = 4;
  suma: number = 0;
  categories: ICategory[] = [];
  isLogin: boolean = false;

  constructor(
    public dialog: MatDialog,
    private shareData: ShipmentService,
    private _categoryserv: CategorysService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this._envio.getInformation().subscribe({
      next: (info) => {
        if (info !== '') {
          this.cart(info);
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
    this.getToken();
  }

  getToken() {
    let a = localStorage.getItem('token');
    this.isLogin = a != null ? true : false;
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }
  logout() {
    localStorage.removeItem('token');
    this._route.navigate(['/products']);
    this.isLogin = false;
  }
  getCategories() {
    this._categoryserv.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
  cart(datos: any) {
    let conta = this.ListProducts.findIndex(
      (x: { id: number }) => x.id === datos.id
    );
    if (conta > -1) {
      alert('porducto ya existe ' + datos.name);
      return;
    }
    this.suma += datos.salePrice;
    this.ListProducts.push(datos);
  }

  viewCart() {
    this._envio.setviewCart(this.ListProducts);
    this.ListProducts = [];
  }

  DeleteItem(id: number) {
    let index = this.ListProducts.findIndex((x: { id: number }) => x.id === id);
    let produts = this.ListProducts.find((x: { id: number }) => x.id === id);
    this.suma -= produts.salePrice;
    this.ListProducts.splice(index, 1);
  }

  search($event: any) {
    this.shareData.setInfo($event.target.value);
  }

}
