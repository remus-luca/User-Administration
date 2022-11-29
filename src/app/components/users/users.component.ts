import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Admin, User } from 'src/interfaces';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';
import { AdminStoreService } from 'src/store/admin-store.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  productForm: FormGroup;
  Unusers: User[];
  user: User[];
  @Input()
  admin: Admin;

  @Output()
  onDeleteUser: EventEmitter<User> = new EventEmitter();
  // @Output() editSupehero: EventEmitter<any> = new EventEmitter();
  @Input()
  set allUsers(data: User[]) {
    if (data) {
      this.Unusers = data.filter((user) =>
        this.admin.usersIds.includes(user.id)
      );
    }
  }

  Users: User[];
  constructor(
    private adminStoreService: AdminStoreService,
    private userService: UserService,
    private adminService: AdminService,
    private formbuilder: FormBuilder
  ) {}
  getUnUser() {
    this.Unusers = this.Users.filter(
      (user) => !this.admin.usersIds.includes(user.id)
    );
    console.log(this.Unusers);
  }
  // TO DO this.userService
  // .getUsersByIds(this.admin.usersIds)
  getUsers(): void {
    if (this.admin?.usersIds.length) {
      this.userService
        .getUsersByIds(this.admin.usersIds)
        .subscribe((data) => (this.Unusers = data));
    } else {
      this.Unusers = [];
    }
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      realName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
    this.getUsers();
  }

  // onDelete(userId: number): void {
  //   const payload = {
  //     UserIds: this.admin.usersIds.filter((id) => id != userId),
  //   };
  //   this.adminService
  //     .updatedAdminUsersIds(payload, this.admin.id)
  //     .subscribe((updatedAdmin: Admin) => {
  //       this.admin = updatedAdmin;
  //       this.getUsers();
  //     });
  // }

  // deleteHero(hero: any) {
  //   this.heroservice.deleteHero(hero.id).subscribe(() => {
  //     this.heroesStore.deleteHero(hero.id);
  //   });
  // }
  // onEdit() {
  //   this.editSupehero.emit(this.hero);
  // }
}
