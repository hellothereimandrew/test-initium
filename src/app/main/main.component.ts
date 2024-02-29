import {Component, Input} from '@angular/core';
import {User} from '../shared/interfaces/users-db';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  @Input() public user: User = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    checked: false,
  };

  @Input() showPopup: boolean = false;

  public getAddedUser(user: User): void {
    this.user = user;
  }

  public hideAddClientForm(): void {
    this.showPopup = !this.showPopup;
  }
}
