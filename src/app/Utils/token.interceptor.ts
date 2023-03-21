import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private _Router = inject(Router)
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token =localStorage.getItem("token")
    if(token){
      request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    })
    }
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
       if(error.status === 401){
           this._Router.navigate(['/login'])
      }
      return throwError(() => new Error ('error'));
    })
    );

  }
}
