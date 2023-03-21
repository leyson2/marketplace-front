import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = environment.baseURL;
  constructor(private http: HttpClient) {}

  profile(username: string){
    return this.http.get<any>(`${this.apiURL}Users/${username}`);
  }
}
