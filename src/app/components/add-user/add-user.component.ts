import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin, User } from 'src/interfaces';
import { UserStoreService } from 'src/store/user-store.service';
enum formSubmit {
  ADD = 'Adaugare',
  EDIT = 'Salvare modificari',
}
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  form: FormGroup;
  submitButton: string = formSubmit.ADD;
  @Input() userToBeEdited: User;
  @Output() exit = new EventEmitter<void>();
  constructor(
    private formBuilder: FormBuilder,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userToBeEdited'].currentValue) {
      this.submitButton = formSubmit.EDIT;
      this.form.patchValue({
        name: this.userToBeEdited.name,
        email: this.userToBeEdited.email,
        phone: this.userToBeEdited.phone,
        address: this.userToBeEdited.address,
      });
    } else {
      this.submitButton = formSubmit.ADD;
    }
    if (changes['visible'] && changes['visible'].currentValue === false) {
      this._reset();
    }
  }
  addUser() {
    if (this.userToBeEdited) {
      this.userStore.updateUser(this.form.value, this.userToBeEdited.id);
    } else {
      this.userStore.addNewUser(this.form.value);
    }
    this._reset();
  }

  onClose() {
    this.exit.emit();
    this._reset();
  }

  private _reset() {
    this.form.reset({
      name: '',
      email: '',
      phone: '',
      address: '',
    });
  }
}
