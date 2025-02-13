import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatInputModule,
    MatError]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role = 'client'; // Valeur par défaut
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.loading = true;
    this.errorMessage = '';

    const userData = { name: this.name, email: this.email, password: this.password, role: this.role };

    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Erreur lors de l’inscription';
        this.loading = false;
      }
    });
  }
}
