import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  public cart;
  public orderDetails;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));
  }

  ngOnDestroy(): void {
    // sessionStorage.removeItem('orderDetails');
  }

}
