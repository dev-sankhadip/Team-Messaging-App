import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http'
import { tap, catchError, finalize, retry } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = window.localStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {
          'authorization': token
        }
      })
    }
    else {
      this.router.navigate['login']
    }


    let ok: string;
    return next.handle(request).pipe(
      tap(
        (evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            if (evt.status === 200 || evt.status === 201) {
              ok = "Succeeded";
            }
          }
        }, (err: HttpErrorResponse) => {
          retry(2)
          if (err.status === 401) {
            ok = "Failed";
            this.router.navigate(['login']);
          }
          return of(err);
        }
      )
    )
  }
}
