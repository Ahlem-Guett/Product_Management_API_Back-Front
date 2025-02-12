import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
//import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { UserListComponent } from './user-list/user-list.component';
import { AdminGuard } from './auth/admin.guard';
import { CategoryListComponent } from './category-list/category-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'users', component: UserListComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '/products' },
  
  // Route accessible uniquement aux utilisateurs connectés
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },

  // Route accessible uniquement aux admins
  { path: 'admin'/*, component: AdminDashboardComponent*/, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },

  // Page non autorisée
  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: '**', redirectTo: '/products' }
];

@NgModule({
  declarations: [LoginComponent,
    RegisterComponent,
    UnauthorizedComponent,
    UserListComponent,
    ProductListComponent,
    CategoryListComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
