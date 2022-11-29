import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Admin } from 'src/interfaces';
import { AdminStoreService } from 'src/store/admin-store.service';
enum formSubmitState {
  ADD = 'Adaugare',
  EDIT = 'Salvare modificari',
}
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  productForm: FormGroup;
  submitButtonText: string = formSubmitState.ADD;

  @Input() adminToBeEdited: Admin;
  @Output() close = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private adminStore: AdminStoreService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adminToBeEdited'].currentValue) {
      this.submitButtonText = formSubmitState.EDIT;
      this.productForm.patchValue({
        name: this.adminToBeEdited.name,
        email: this.adminToBeEdited.email,
      });
    } else {
      this.submitButtonText = formSubmitState.ADD;
    }

    if (changes['visible'] && changes['visible'].currentValue === false) {
      this._resetForm();
    }
  }

  addAdmin() {
    if (this.adminToBeEdited) {
      this.adminStore.updateAdmin(
        this.productForm.value,
        this.adminToBeEdited.id
      );
    } else {
      this.adminStore.addNewAdmin(this.productForm.value);
    }

    this._resetForm();
  }

  onCloseModal() {
    this.close.emit();
    this._resetForm();
  }

  private _resetForm() {
    this.productForm.reset({
      imageUrl: '',
      name: '',
      ingredients: '',
      description: '',
    });
  }
}
