import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';

import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButton
  ]
})

export class UserListComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['email', 'role', 'actions'];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  openDialog(user?: any): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addUser(result);
      }
    });
  }

  addUser(newUser: any): void {
    this.userService.addUser(newUser).subscribe(response => {
      console.log('Utilisateur ajouté avec succès', response);
      this.loadUsers(); // Rafraîchir la liste après ajout
    });
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user // Passer l'utilisateur sélectionné pour modification
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser(result);
      }
    });
  }

  updateUser(updatedUser: any): void {
    this.userService.updateUser(updatedUser.id, updatedUser).subscribe(response => {
      console.log('Utilisateur mis à jour avec succès', response);
      this.loadUsers(); // Rafraîchir la liste après mise à jour
    });
  }

  deleteUser(user: any) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(user.id).subscribe(() => {
        console.log('Utilisateur supprimé');
        this.loadUsers();
      });
    }
  }
}
