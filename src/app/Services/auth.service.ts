import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = environment.baseURL;
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post<any>(`${this.apiURL}Users/Registro`, data);
  }

  login(data: any) {
    return this.http.post<any>(`${this.apiURL}Users/Login`, data);
  }
}
