import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/interfaces';
import { AdminStoreService } from 'src/store/admin-store.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  admins: Admin[];
  adminToBeEdited: Admin = null;
  constructor(private adminsStore: AdminStoreService) {}

  ngOnInit(): void {
    this.adminsStore.admins$.subscribe((admins) => {
      this.admins = admins;
    });
  }
  editAdmin(admin: Admin) {
    this.adminToBeEdited = admin;
  }
  onFormClose() {
    this.adminToBeEdited = null;
  }
}
