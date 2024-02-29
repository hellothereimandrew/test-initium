import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MainTableComponent} from './main-table/main-table.component';
import {MainComponent} from './main.component';
import {ClientService} from './services/client.service';
import {AddClientFormComponent} from './main-table/add-client-form/add-client-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {PopupComponent} from '../shared/components/popup/popup.component';

@NgModule({
  declarations: [MainComponent, MainTableComponent, AddClientFormComponent, PopupComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [ClientService],
})
export class MainModule {}
