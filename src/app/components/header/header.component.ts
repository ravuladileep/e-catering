import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  public loginres = false;
  public loginresponseData;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    if(JSON.parse(sessionStorage.getItem('loginResponse'))){
      this.loginres = true;
      this.loginresponseData = JSON.parse(sessionStorage.getItem('loginResponse'));
    }else {
      this.loginres = false;
    }
  }

  public logOut(){
    sessionStorage.removeItem('loginResponse');
    this.router.navigate(['home']);
  }

}
