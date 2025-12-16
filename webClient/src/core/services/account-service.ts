import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginCreds, RegisterCreds, User} from '../../types/user';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null)

  baseUrl = 'https://localhost:7290/api/';

  register(creds: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + 'Accounts/register', creds).pipe(
      tap((user: User) => this.setCurrentUser(user)
      )
    )
  }

  login(creds: LoginCreds) {
    return this.http.post<User>(this.baseUrl + 'Accounts/login', creds).pipe(
      tap((user: User) => this.setCurrentUser(user)
      )
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  setCurrentUser(user: User) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUser.set(user);
    }
  }
}
