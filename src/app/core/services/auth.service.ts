import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  message: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}login`, {
      username,
      password,
    });
  }

  regiser(username: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}register`, {
      username,
      password,
    });
  }
}
