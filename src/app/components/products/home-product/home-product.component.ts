import { Component, inject } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { ShipmentService } from 'src/app/Services/shipment.service';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.scss']
})
export class HomeProductComponent {
  products: any = [];

  private _produService = inject(ProductsService);
  private _envio = inject(ShipmentService);
  constructor() {}
  ngOnInit(): void {
    this.getProducts();
  }



  getProducts() {
    this._produService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  AddCart(id : number){

   let data = this.products.filter((x: { id: number; })=>x.id == id);
   this._envio.setInformation(data);
    
  }
}
