import { HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { CredentialService } from '../storage/credential.service'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const TOKEN_HEADER_KEY = 'Authorization'; 

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

	constructor(private credential: CredentialService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let isToApi = req.url.indexOf(environment.apiUrl) === 0;
		if (isToApi) {
			let authReq = req;
			const token = this.credential.getToken();
			if (token != null) {
				authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer '+ token)});
			}
			return next.handle(authReq);
		}

		return next.handle(req);
	}
}

export const authInterceptorProvider = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]