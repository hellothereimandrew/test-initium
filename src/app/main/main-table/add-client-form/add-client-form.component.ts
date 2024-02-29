import {Component, EventEmitter, Input, OnInit, Output, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/shared/interfaces/users-db';
import {MainTableComponent} from '../main-table.component';

@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.scss'],
})
export class AddClientFormComponent {
  @Input() public showAddClientForm: boolean = false;
  @Input() public showEditClientForm: boolean = false;
  @Input() public editableUser: User = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    checked: false,
  };

  @Output() public showAddClientFormListener: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public user: EventEmitter<User> = new EventEmitter<User>();

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[+0-9]+$/),
      Validators.minLength(12),
      Validators.maxLength(12),
    ]),
    checked: new FormControl(false),
  });

  public ngAfterViewChecked() {
    this.editUser(this.editableUser);
  }

  public addUser(form: FormGroup): void {
    form = this.form;

    const temp: User = {
      name: form.controls['name'].value,
      surname: form.controls['surname'].value,
      email: form.controls['email'].value,
      phone: form.controls['phone'].value,
      checked: form.controls['checked'].value,
    };

    this.user.emit(temp);
  }

  public editUser(user: User): void {
    this.showEditClientForm = true;
    user = this.editableUser;
    let form = this.form;

    form.patchValue({
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      checked: user.checked,
    });
  }

  public confirm(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    this.showAddClientFormListener.emit();
    this.addUser(this.form);
    this.showAddClientForm = !this.showAddClientForm;
    return true;
  }

  public decline(): void {
    this.showAddClientFormListener.emit();
    this.showAddClientForm = !this.showAddClientForm;
  }
}
