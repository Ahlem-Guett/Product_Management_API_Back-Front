import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
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
        this.loadUsers();
      }
    });
  }

  deleteUser(user: any) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
