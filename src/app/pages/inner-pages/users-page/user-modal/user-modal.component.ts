import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../../../services/http.service';
import { IUserPostParams } from '../../../../models/users.interface';

@Component({
  selector: 'app-user-modal',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent {
  private data = inject(MAT_DIALOG_DATA);
  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpService);
  readonly dialogRef = inject(MatDialogRef<UserModalComponent>);

  userForm = this.fb.group({
    id: [null],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {
    if (this.userForm.valid) {
      this.userForm.disable();
      const { id, ...rest } = this.userForm.getRawValue();
      this.http.post<IUserPostParams>('/users', rest).subscribe({
        next: (res) => {
          this.userForm.enable();
          this.dialogRef.close(this.userForm.getRawValue());
        },
        error: () => this.userForm.enable(),
      });
    }
  }
}
