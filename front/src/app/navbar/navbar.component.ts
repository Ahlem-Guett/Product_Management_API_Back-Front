import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButton]
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
