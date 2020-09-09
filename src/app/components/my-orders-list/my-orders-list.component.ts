import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-my-orders-list',
  templateUrl: './my-orders-list.component.html',
  styleUrls: ['./my-orders-list.component.scss']
})
export class MyOrdersListComponent implements OnInit {
  public ordersList;
  public loginres = JSON.parse(sessionStorage.getItem('loginResponse'));
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getOrderList(this.loginres.AuthenticateUser.userId);
  }

  getOrderList(id) {
    this.cartService.getPreviousOrders(id)
    .subscribe((data) => {
      this.ordersList = data;
    });
  }

}
