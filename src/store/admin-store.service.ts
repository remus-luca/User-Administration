import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Admin } from 'src/interfaces';
import { AdminService } from 'src/services/admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminStoreService {
  public admins$ = new BehaviorSubject<Admin[]>([]);
  private addAdmin$ = new Subject<Admin>();
  private updateAdmin$ = new Subject<Admin>();
  private deleteAdmin$ = new Subject<number>();
  constructor(private adminService: AdminService) {
    this.addAdmin$.subscribe((newAdmin: Admin) => {
      this.admins$.next([...this.admins$.getValue(), newAdmin]);
    });
    this.updateAdmin$.subscribe((updatedAdmin) => {
      const updatedAdmins: Admin[] = [];
      this.admins$.getValue().forEach((admin) => {
        admin.id === updatedAdmin.id
          ? updatedAdmins.push(updatedAdmin)
          : updatedAdmins.push(admin);
      });
      this.admins$.next(updatedAdmins);
    });
    this.deleteAdmin$.subscribe((idtoBeDeleted: number) => {
      this.admins$.next(
        this.admins$.getValue().filter((recipe) => {
          return recipe.id != idtoBeDeleted;
        })
      );
    });

    this.adminService.getAdmins().subscribe((admins) => {
      this.admins$.next(admins);
    });
  }

  addNewAdmin(admin: Admin) {
    this.adminService
      .postAdmin(admin)
      .subscribe((admin) => this.addAdmin$.next(admin));
  }
  updateAdmin(payload: Admin, id: number) {
    this.adminService
      .updatedAdminUsersIds(payload, id)
      .subscribe((updatedAdmin) => {
        this.updateAdmin$.next(updatedAdmin);
      });
  }
  deleteAdmin(id: number) {
    this.deleteAdmin$.next(id);
  }
}
