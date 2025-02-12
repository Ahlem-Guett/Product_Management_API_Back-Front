import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // Rôle attendu
    const userRole = this.authService.getUserRole(); // Rôle actuel de l'utilisateur

    if (userRole === expectedRole || userRole === 'admin') {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); // Redirection si l'accès est refusé
      return false;
    }
  }
}
