import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Admin } from 'src/interfaces';
import { AdminService } from 'src/services/admin.service';
import { AdminStoreService } from 'src/store/admin-store.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private adminStore: AdminStoreService,
    private adminService: AdminService
  ) {}
  @Input()
  admin: Admin;
  @Output() editSuperAdmin: EventEmitter<any> = new EventEmitter();

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
