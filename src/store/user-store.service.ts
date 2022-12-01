import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/interfaces';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  public users$ = new BehaviorSubject<User[]>([]);
  private addUser$ = new Subject<User>();
  private updateUser$ = new Subject<User>();
  private deleteUser$ = new Subject<number>();
  constructor(private userService: UserService) {
    this.addUser$.subscribe((newUser: User) => {
      this.users$.next([...this.users$.getValue(), newUser]);
    });
    this.updateUser$.subscribe((updatedUser) => {
      const updatedUsers: User[] = [];
      this.users$.getValue().forEach((user) => {
        user.id === updatedUser.id
          ? updatedUsers.push(updatedUser)
          : updatedUsers.push(user);
      });
      this.users$.next(updatedUsers);
    });
    this.deleteUser$.subscribe((idtoBeDeleted: number) => {
      this.users$.next(
        this.users$.getValue().filter((user) => {
          return user.id != idtoBeDeleted;
        })
      );
    });

    this.userService.getUsers().subscribe((users) => {
      this.users$.next(users);
    });
  }
  addNewUser(user: User) {
    this.userService
      .postUser(user)
      .subscribe((user) => this.addUser$.next(user));
  }
  updateUser(payload: User, id: number) {
    this.userService
      .updatedUserAdminsIds(payload, id)
      .subscribe((updatedUser) => {
        this.updateUser$.next(updatedUser);
      });
  }
  deleteUser(id: number) {
    this.deleteUser$.next(id);
  }
}
