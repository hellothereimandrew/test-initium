import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from 'src/app/shared/interfaces/users-db';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  public url: string = 'https://test-data.directorix.cloud/task1';

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }
}
