import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgOptimizedImage} from '@angular/common';
import {Nav} from '../layouts/nav/nav';
import {AccountService} from '../core/services/account-service';
import {lastValueFrom} from 'rxjs';
import {User} from '../types/user';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage,
    Nav
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient)
  protected readonly title = signal('UdemyDating App');
  protected appUsers = signal<any>([]);

  async ngOnInit() {
    this.appUsers.set(await this.getAppUsers());
    this.setCurrentUser();

  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getAppUsers() {
    try {
      return lastValueFrom(this.http.get("https://localhost:7290/api/AppUsers"));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
