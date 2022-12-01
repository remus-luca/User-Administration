import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Admin, User } from 'src/interfaces';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';
import { AdminStoreService } from 'src/store/admin-store.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  productForm: FormGroup;
  @Input()
  admin: Admin;

  user: User;
  @Input()
  set allUsers(data: User[]) {
    if (data) {
      this.users = data.filter((user) => this.admin.userIds?.includes(user.id));
    }
  }

  users: User[];

  @Output() editSuperAdmin: EventEmitter<any> = new EventEmitter();
  @Output() editSuperUser: EventEmitter<any> = new EventEmitter();
  @Output()
  onDeleteUser: EventEmitter<User> = new EventEmitter();

  constructor(
    private adminStore: AdminStoreService,
    private adminService: AdminService,
    private userService: UserService
  ) {}

  getUsers(): void {
    if (this.admin.userIds?.length) {
      this.userService
        .getUsersByIds(this.admin.userIds)
        .subscribe((data) => (this.users = data));
    } else {
      this.users = [];
    }
  }

  ngOnInit(): void {}
  onDelete(userId: number): void {
    const payload = {
      userIds: this.admin.userIds.filter((id) => id != userId),
    };
    this.adminService
      .updatedAdminUsersIds(payload, this.admin.id)
      .subscribe((updatedAdmin: Admin) => {
        this.admin = updatedAdmin;
        this.getUsers();
      });
  }
  deleteAdmin(admin: any) {
    this.adminService.deleteAdmin(admin.id).subscribe(() => {
      this.adminStore.deleteAdmin(admin.id);
    });
  }
  onEdit() {
    this.editSuperAdmin.emit(this.admin);
  }
  Edit() {
    this.editSuperUser.emit(this.user);
  }
}
