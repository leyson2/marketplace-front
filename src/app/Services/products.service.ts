import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiURL = environment.baseURL;
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}Products`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}Products/${id}`);
  }

  Add(data: any) {
    return this.http.post<any>(`${this.apiURL}Products`, data);
  }

  Delete(id: number) {
    return this.http.delete<any>(`${this.apiURL}Products/${id}`);
  }

  Update(id: number, data: any) {
    return this.http.put<any>(`${this.apiURL}Products/${id}`, data);
  }
}
