import { Component, Input, OnInit } from '@angular/core';
import { Admin, User } from 'src/interfaces';
import { UserService } from 'src/services/user.service';
import { AdminStoreService } from 'src/store/admin-store.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  admins: Admin[];
  adminToBeEdited: Admin = null;
  userToBeEdited: User = null;
  constructor(
    private adminsStore: AdminStoreService,
    private userService: UserService
  ) {}

  allUsers: User[];

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => (this.allUsers = data));
    this.adminsStore.admins$.subscribe((admins) => {
      this.admins = admins;
    });
  }
  editAdmin(admin: Admin) {
    this.adminToBeEdited = admin;
  }
  editUser(user: User) {
    this.userToBeEdited = user;
  }
  onFormClose() {
    this.adminToBeEdited = null;
  }
  closeForm() {
    this.userToBeEdited = null;
  }
}
