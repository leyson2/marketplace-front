import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  ListProducts: any = [];
  public pCurrent: number = 1;

  private _produService = inject(ProductsService);
  constructor() {}

  ngOnInit(): void {
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
        // this.toastr.success(res.men);
        this.getProducts();
      },
      error: (e: HttpErrorResponse) => {
        // this.toastr.error('Algo salio mal');
      },
    });
  }
}
