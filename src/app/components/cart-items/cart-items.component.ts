import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit, DoCheck {
public menuItems;
public packageItems;
public cartAmount;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.menuItems = this.cartService.cart.menuItems;
    this.packageItems = this.cartService.cart.package;
    this.calcTotal();
  }


  ngDoCheck(): void {
    // this.menuItems = this.cartService.cart.menuItems;
    // this.packageItems = this.cartService.cart.package;
    this.calcTotal();
  }

  calcTotal(){
    let Total = []
    this.cartService.cart.menuItems.forEach((x)=>{
      Total.push(x.price * x.quantity)
    });
    this.cartService.cart.package.forEach((x)=>{
      Total.push(x.PackageDetails.PkgQty * x.packageCost)
    });
    this.cartAmount = Total.reduce((a, b) => a + b, 0)
  }

}
