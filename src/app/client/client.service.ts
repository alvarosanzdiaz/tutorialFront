import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './model/Client';
import { CLIENT_DATA } from './model/mock-clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }
  
  getClients(): Observable<Client[]> {
    return of(CLIENT_DATA);
  }
  saveClient(client: Client): Observable<Client> {
    return of(null);
  }

  deleteClient(idClient : number): Observable<any> {
    return of(null);
  }  
}
