import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const Cliente: string = '';
@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private subjectInformations: BehaviorSubject<any> =
    new BehaviorSubject<string>(Cliente);

  private subjectInfo: BehaviorSubject<any> = new BehaviorSubject<string>(
    Cliente
  );

  private viewCart: BehaviorSubject<any> = new BehaviorSubject<string>(Cliente);

  private subJectProduct: BehaviorSubject<any> = new BehaviorSubject<string>(
    Cliente
  );

  private subJectLogin: BehaviorSubject<any> = new BehaviorSubject<string>(
    Cliente
  );

  getInfoLogin() {
    return this.subJectLogin.asObservable();
  }

  setInfoLogin(information: any) {
    this.subJectLogin.next(information);
  }


  getInformation() {
    return this.subjectInformations.asObservable();
  }

  setInformation(information: any) {
    this.subjectInformations.next(information);
  }
  getInfo() {
    return this.subjectInfo.asObservable();
  }

  setInfo(data: any) {
    this.subjectInfo.next(data);
  }

  getviewCart() {
    return this.viewCart.asObservable();
  }
  setviewCart(data: any) {
    this.viewCart.next(data);
  }

  getInfoProduct() {
    return this.subJectProduct.asObservable();
  }
  setInfoProduct(data: any) {
    this.subJectProduct.next(data);
  }
}
