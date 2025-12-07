import {Component, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient)
  protected readonly title = signal('UdemyDating App');
  protected appUsers = signal<any>([]);

  ngOnInit(): void {
    this.http.get("https://localhost:7290/api/AppUsers").subscribe({
      next: (data) => this.appUsers.set(data),
      error: (err) => console.error(err),
      complete: () => console.log('complete')
    });
  }
}
