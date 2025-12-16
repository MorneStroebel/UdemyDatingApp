import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginCreds, User} from '../../types/user';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null)

  baseUrl = 'https://localhost:7290/api/';

  login(creds: LoginCreds) {
    return this.http.post<User>(this.baseUrl + 'Accounts/login', creds).pipe(
      tap((user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
          if (user) this.currentUser.set(user);
        }
      )
    )
  }

  logout() {
    localStorage.removeItem('user');
    1
    this.currentUser.set(null);
  }
}
