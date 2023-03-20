import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const Cliente : string = ''
@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  private subjectInformations: BehaviorSubject<any> = new BehaviorSubject<string>(Cliente);
  
  getInformation() {
    return this.subjectInformations.asObservable();
  }

  setInformation(information: any) {
    this.subjectInformations.next(information);
  }

}
