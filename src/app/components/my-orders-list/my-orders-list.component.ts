import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-my-orders-list',
  templateUrl: './my-orders-list.component.html',
  styleUrls: ['./my-orders-list.component.scss']
})
export class MyOrdersListComponent implements OnInit {
  public ordersList;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList() {
    this.cartService.getPreviousOrders()
    .subscribe((data) => {
      this.ordersList = data;
    });
  }

}
