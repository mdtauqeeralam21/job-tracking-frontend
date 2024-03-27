import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';




const AUTH_API= environment.apiUrl;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   http: HttpClient = inject(HttpClient);
  

  login(credentials: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      credentials,
      httpOptions
    );
  }

  register(newUser: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      newUser,
      httpOptions
    );
  }


  //update user
  updateUser(newUser: any): Observable<any> {
    return this.http.patch(
      AUTH_API + 'updateUser',
      newUser,
      httpOptions
    );
  }

  // Get user profile
  getUserProfile(): Observable<any> {
    return this.http.get(AUTH_API + 'getCurrentUser',httpOptions);
  }


  logout(): Observable<any> {
    return this.http.get(AUTH_API + 'logout', {}
    );
  }

  

}





