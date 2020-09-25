import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public webServiceUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getUrl(){
    this.webServiceUrl = localStorage.getItem('webServiceUrl');
  }

  public login(userid, password): Observable<any>{
  this.getUrl();
  return this.http.get(`${this.webServiceUrl}/authenticateUser?userId=${userid}&password=${password}&catererId=menuscat&guestUserFlag=0`);
  }

  guestUser(): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/authenticateUser?userId=null&password=null&catererId=menuscat&guestUserFlag=1`);
  }

  redirectToHome(){
    if (JSON.parse(sessionStorage.getItem('templateValue')).templatevalue === 1){
      this.router.navigate(['home']);
    }else {
      this.router.navigate(['cater-theme-one']);
    }
  }
}
