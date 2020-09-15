import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders-list',
  templateUrl: './my-orders-list.component.html',
  styleUrls: ['./my-orders-list.component.scss']
})
export class MyOrdersListComponent implements OnInit {
  public ordersList;
  public p = 1;
  public loginres = JSON.parse(sessionStorage.getItem('loginResponse'));

  constructor(private orderService: OrderService,
              private spinner: NgxSpinnerService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.getOrderList(this.loginres.AuthenticateUser.userId);
  }

  public getOrderList(id): void{
    this.spinner.show();
    this.orderService.getPreviousOrders(id)
    .subscribe((data) => {
      this.ordersList = data;
    }, err => { this.spinner.hide(); }, () => {this.spinner.hide(); });
  }

  public changeCount(event): void {
    this.p = 1;
  }

  public repeatOrder(orderNumber): void{
    this.spinner.show();
    this.orderService.repeatOrder(orderNumber).subscribe((res) => {
      sessionStorage.setItem('repeatOrderData', JSON.stringify(res));
      this.cartService.cart['menuItems'] = res.menuItems;
      this.cartService.cart['package'] = res.package;
      this.cartService.cart['combo'] = res.combo;
      this.router.navigate(['home']);
    }, err => { this.spinner.hide(); }, () => {this.spinner.hide(); });
  }

}
