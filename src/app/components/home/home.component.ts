import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._envio.getInformation().subscribe({
      next: (info) => {
        if (info !== '') {
          this.cart(info);
        }
      },
    });
  }

  login(): void {
   const dialogRef = this.dialog.open(LoginComponent, {
    width: '480px'
   });
   dialogRef.afterClosed().subscribe(res => {
    console.log(res);
   })
  }


  cart(datos:any){

    this.ListProducts.push(datos)


  }


}
