import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IUserData } from '../../../models/auth.interface';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-users-page',
  imports: [
    MatTableModule,
    MatProgressBarModule,
    DatePipe,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt'];

  private http = inject(HttpService);

  readonly users = signal<IUserData[]>([]);
  readonly isLoading = signal<boolean>(false);

  readonly dialog = inject(MatDialog);

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

  openUserModal() {
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: {
        user: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
