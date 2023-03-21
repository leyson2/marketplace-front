import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorysService } from 'src/app/Services/categorys.service';
import { ProductsService } from 'src/app/Services/products.service';
import { ShipmentService } from 'src/app/Services/shipment.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  ListProducts: any = [];
  private _router = inject(Router);
  public pCurrent: number = 1;
  public nItems : number = 5;
  public itemPage: number = 5;

  private _envio = inject(ShipmentService);
  private _produService = inject(ProductsService);
  constructor() {}

  ngOnInit(): void {
    this.perPage();
    this.getProducts();
  }

  getProducts() {
    this._produService.getAll().subscribe((data) => {
      this.ListProducts = data;
    });
  }

  Delete(id: any) {
    this._produService.Delete(id).subscribe({
      next: (res) => {
        this.getProducts();
      },
      error: (e: HttpErrorResponse) => {},
    });
  }

  editProduct(id: Number) {
    this._router.navigate(['/products-form']);
    this._envio.setInfoProduct(id);
  }

  perPage() {
    this.nItems = this.itemPage;
  }
}
