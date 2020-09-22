import { Component, DoCheck, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cater-theme-one-cart',
  templateUrl: './cater-theme-one-cart.component.html',
  styleUrls: ['./cater-theme-one-cart.component.scss']
})
export class CaterThemeOneCartComponent implements OnInit, DoCheck {
  public cart;
  public cartAmount;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.calcTotal();
  }


  ngDoCheck(): void {
    // this.menuItems = this.cartService.cart.menuItems;
    // this.packageItems = this.cartService.cart.package;
    this.calcTotal();
  }

  calcTotal(){
    let Total = [];
    this.cartService.cart.menuItems.forEach((x) => {
      Total.push(+x.price * +x.quantity);
    });
    this.cartService.cart.package.forEach((x) => {
      Total.push(+x.PackageDetails.PkgQty * +x.PackageDetails.packageCost);
    });
    this.cartService.cart.combo.forEach((x) => {
      Total.push(+x.ComboDetails.comboQty * +x.ComboDetails.comboCost);
    });
    this.cartAmount = Total.reduce((a, b) => a + b, 0);
  }


}
