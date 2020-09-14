import { Component, OnInit, OnChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public cartItems;
  public subTotal;
  public packageItems;
  public comboItems;
  public repeatOrderData = false;
  constructor(private cartService: CartService,
              private authService: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.cart.menuItems;
    this.packageItems = this.cartService.cart.package;
    this.comboItems = this.cartService.cart.combo;
    this.calcSubTotal();
    if (JSON.parse(sessionStorage.getItem('repeatOrderData'))){
      this.repeatOrderData = true;
    };
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
    this.cartService.cart.package.forEach((x)=>{
      subTotal.push(+x.PackageDetails.PkgQty * +x.PackageDetails.packageCost)
    });
    this.cartService.cart.combo.forEach((x)=>{
      subTotal.push(+x.ComboDetails.comboQty * +x.ComboDetails.comboCost)
    });
    this.subTotal = subTotal.reduce((a, b) => a + b, 0);
  }

  checkOutGuest(){
    this.spinner.show();
    this.authService.guestUser().subscribe((res)=>{
      sessionStorage.setItem('loginResponse', JSON.stringify(res))
      this.router.navigate(['order-details']);
    }, err => { this.spinner.hide(); }, () => {this.spinner.hide();});
  }

}
