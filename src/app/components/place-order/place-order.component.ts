import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  public cartItems = [];
  public orderDetails;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    this.orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));
  }

  ngOnDestroy(): void {
    // sessionStorage.removeItem('orderDetails');
  }

}
