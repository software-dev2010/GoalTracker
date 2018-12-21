import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BasicAuthenticationService {

    constructor(private http: HttpClient) { }

    executeAuthenticationService(username, password) {

        let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
        let headers = new HttpHeaders({
            Authorization: basicAuthHeaderString
        });

        return this.http.get<AuthenticationBean>(
            'http://localhost:8080/basicauth',
            {headers}).pipe(
                map(
                    data => {
                        sessionStorage.setItem('authenticatedUser', username);
                        sessionStorage.setItem('token', basicAuthHeaderString);
                        return data;
                    }
                )
            );

        // If there is a valid response then set something into session and return the response back 
        // so that whoever is subscribing to it will get the data. 
    }

    getAuthenticatedUser() {
        return sessionStorage.getItem('authenticatedUser');
    }

    getAuthenticatedToken() {
        if (this.getAuthenticatedUser())
            return sessionStorage.getItem('token');
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
        sessionStorage.removeItem('token');
    }
}

export class AuthenticationBean {
    constructor(public message: string) { }
}