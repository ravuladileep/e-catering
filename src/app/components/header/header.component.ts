import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  public loginres = false;
  public loginresponseData;

  constructor(private router: Router, private cartService: CartService) { }

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
    this.cartService.cart.combo  = [];
    this.cartService.cart.menuItems  = [];
    this.cartService.cart.package  = [];
  }

}
