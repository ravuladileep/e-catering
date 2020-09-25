import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  public loginres = false;
  public loginresponseData;

  constructor(private router: Router,
              private cartService: CartService,
              private authService: AuthService) { }

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
    this.authService.redirectToHome();
    this.cartService.cart.combo  = [];
    this.cartService.cart.menuItems  = [];
    this.cartService.cart.package  = [];
  }

  loginFromHome(){
    this.cartService.loginFromHome.next(true);
    this.router.navigate(['login']);
  }

}
