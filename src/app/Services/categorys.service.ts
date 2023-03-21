import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorysService {
  private apiURL = environment.baseURL;
  
  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}Categorys`);
   }
 
   Add (data: any) {
     return this.http.post<any>(`${this.apiURL}Categorys`, data);
    }
 
   Delete (id : number){
     return this.http.delete<any>(`${this.apiURL}Categorys/${id}`);
    }
 
  
}
