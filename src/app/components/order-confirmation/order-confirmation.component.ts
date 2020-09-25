import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit, AfterViewInit {
  public loginres = JSON.parse(sessionStorage.getItem('loginResponse'));
  public totalAmount;
  constructor(private router: Router,
              private cartService: CartService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.totalAmount = this.cartService.cartTotalAmount();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.loginres.AuthenticateUser.userId !== 0){
        this.cartService.clearCartItems();
        this.router.navigate(['orders-list']);
      }else {
        this.cartService.clearCartItems();
        this.authService.redirectToHome();
      }
    }, 5000);
  }

}
