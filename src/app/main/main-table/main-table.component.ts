import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from 'src/app/shared/interfaces/users-db';
import {ClientService} from '../services/client.service';
import {Subject, map, takeUntil} from 'rxjs';
import {PopupData} from 'src/app/shared/interfaces/popup-data';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})
export class MainTableComponent implements OnInit {
  @Input() public user: User = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    checked: false,
  };
  @Input() public showAddClientForm: boolean = false;
  @Input() public showEditClientForm: boolean = false;

  @Output() public addClientFormListener: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public editableUserListener: EventEmitter<User> = new EventEmitter<User>();

  public users: User[] = [];
  public unsubscribe = new Subject();
  public showPopup: boolean = false;
  public popupData: PopupData = {
    message: '',
    firstButton: '',
    secondButton: '',
  };

  public currentUser: User = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    checked: false,
  };

  constructor(private clientService: ClientService) {}

  public ngOnInit(): void {
    this.getUsers();
  }

  public ngOnDestroy(): void {
    //отмена подписки на получение пользователей
  }

  public getUsers(): void {
    this.clientService
      .getUsers()
      .pipe(
        takeUntil(this.unsubscribe),
        map((response: any) => {
          const users = response.users ?? [];
          return users.map((user: any) => ({...user, checked: false}));
        })
      )
      .subscribe((users: any) => {
        this.users = users;
      });
  }

  public getAddedUser(user: User): void {
    this.user = user;
    this.users.push(user);
  }

  public addClientFormEmitter(): void {
    this.showAddClientForm = !this.showAddClientForm;
    this.addClientFormListener.emit();
  }

  public editUserEmitter(currentUser: User): void {
    this.currentUser = currentUser;
    this.showAddClientForm = !this.showAddClientForm;
    this.editableUserListener.emit(this.currentUser);
  }

  public deleteUsers() {
    let filteredUsers = this.users.filter((user: User) => user.checked);

    filteredUsers.forEach((element) => {
      this.users.splice(this.users.indexOf(element), 1);
    });
  }

  public openPopup(): void {
    this.showPopup = true;

    const popupData: PopupData = {
      message: 'Вы уверены, что хотите удалить выбранные строки?',
      firstButton: 'Нет',
      secondButton: 'Да',
      confirmed: () => {
        this.deleteUsers();
      },
    };

    this.popupData = popupData;
  }
}
