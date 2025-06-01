import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IUserData } from '../../../models/auth.interface';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-users-page',
  imports: [MatTableModule, MatProgressBarModule, DatePipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt'];

  private http = inject(HttpService);

  readonly users = signal<IUserData[]>([]);
  readonly isLoading = signal<boolean>(false);

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading.set(true);
    this.http.get<IUserData[]>('/users').subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.isLoading.set(false);
      },
    });
  }
}
