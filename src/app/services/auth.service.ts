import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public webServiceUrl;

  constructor(private http: HttpClient) { }

  getUrl(){
    this.webServiceUrl = localStorage.getItem('webServiceUrl');
  }

  public login(userid, password): Observable<any>{
    this.getUrl();
  return this.http.get(`${this.webServiceUrl}/authenticateUser?userId=${userid}&password=${password}&catererId=menuscat`);
  }

}
