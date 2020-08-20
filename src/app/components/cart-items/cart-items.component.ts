import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit, DoCheck {
public cartItems;
public cartAmount;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    this.calcTotal();
  }
  // ngOnChanges(): void {
  //   this.cartItems = this.cartService.cartItems;
  //   this.calcTotal();
  // }

  ngDoCheck(): void {
    this.cartItems = this.cartService.cartItems;
    this.calcTotal();
  }

  calcTotal(){
    let Total = []
    this.cartService.cartItems.forEach((x)=>{
      Total.push(x.price * x.quantity)
    });
    this.cartAmount = Total.reduce((a, b) => a + b, 0)
  }

}
