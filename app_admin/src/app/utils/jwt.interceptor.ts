import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var isAuthAPI: boolean;

    // Identify if the request is for login or register
    if (request.url.startsWith('login') || request.url.startsWith('register')) {
      isAuthAPI = true;
    } else {
      isAuthAPI = false;
    }

    // If the user is logged in and the request is not for AuthAPI, add the JWT to the header
    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      let token = this.authenticationService.getToken();
      // Clone the request to add the new Authorization header
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }
    // Proceed with the original request if not authenticated or is an AuthAPI
    return next.handle(request);
  }
}

// Unique provider to wire the interceptor into our pipelines
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
