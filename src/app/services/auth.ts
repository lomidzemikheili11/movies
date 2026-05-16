import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(this.hasToken());
  currentUser = signal<any>(this.getSavedUser());

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_up', userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>('https://api.everrest.educata.dev/auth/sign_in', credentials).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.isLoggedIn.set(true);
          
          // 🚀 ლოგინისას სიგნალში ვსვამთ რეგისტრაციის დროს შენახულ იუზერს
          this.currentUser.set(this.getSavedUser());
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private getSavedUser(): any {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
}