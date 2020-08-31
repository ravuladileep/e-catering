import { Component, OnInit, OnChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public cartItems;
  public subTotal;
  public packageItems;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.cart.menuItems;
    this.packageItems = this.cartService.cart.package;
    this.calcSubTotal();
  }
  changeQuantity(i, $event) {
    this.cartService.cart.menuItems[i].quantity = +$event.target.value;
    this.calcSubTotal();
  }

  calcSubTotal() {
    let subTotal = [];
    this.cartService.cart.menuItems.forEach((x) => {
      subTotal.push(x.price * x.quantity);
    });
    this.subTotal = subTotal.reduce((a, b) => a + b, 0);
  }
}
