import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class ProductsService {
  private apiURL = environment.baseURL;
  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}Products`);
   }
 
   Add (data: any) {
     return this.http.post<any>(`${this.apiURL}Products` , data);
    }
 
   Delete (id : string){
 
     return this.http.delete<any>(`${this.apiURL}Products/${id}`);
    }
 
    Update(id: any, data: any){
     return this.http.put<any>(`${this.apiURL}Products/${id}`, data);
    }
}
