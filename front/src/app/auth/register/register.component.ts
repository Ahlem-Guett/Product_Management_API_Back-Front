import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
