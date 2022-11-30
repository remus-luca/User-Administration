import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Admin, User } from 'src/interfaces';
import { AdminService } from 'src/services/admin.service';
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
  @Input()
  set allUsers(data: User[]) {
    if (data) {
      this.users = data.filter((user) => this.admin.userIds?.includes(user.id));
    }
  }

  users: User[];

  @Output() editSuperAdmin: EventEmitter<any> = new EventEmitter();
  @Output()
  onDeleteUser: EventEmitter<User> = new EventEmitter();

  constructor(
    private adminStore: AdminStoreService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}
  deleteAdmin(admin: any) {
    this.adminService.deleteAdmin(admin.id).subscribe(() => {
      this.adminStore.deleteAdmin(admin.id);
    });
  }
  onEdit() {
    this.editSuperAdmin.emit(this.admin);
  }
}
