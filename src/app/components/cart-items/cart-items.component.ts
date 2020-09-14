import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

declare var $: any;
@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit, DoCheck {
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
    let Total = []
    this.cartService.cart.menuItems.forEach((x)=>{
      Total.push(+x.price * +x.quantity)
    });
    this.cartService.cart.package.forEach((x)=>{
      Total.push(+x.PackageDetails.PkgQty * +x.PackageDetails.packageCost)
    });
    this.cartService.cart.combo.forEach((x)=>{
      Total.push(+x.ComboDetails.comboQty * +x.ComboDetails.comboCost)
    });
    this.cartAmount = Total.reduce((a, b) => a + b, 0)
  }

  // toggle
  icontoggle() {
    $('.right-panel').toggleClass('hide');
    }

}
