import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  public cart;
  public orderDetails;
  public loginres;
  public customerAddress;
  constructor(private cartService: CartService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.loginres = JSON.parse(sessionStorage.getItem('loginResponse'));
    this.getCustomerAdress();
    this.orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));
  }

  /**
   * function : getCustomerAdress
   * purpose  : getting the customer address to display left side of the place order screen
   */

  public getCustomerAdress(){
    this.orderService.getCustomerAddress(this.loginres.AuthenticateUser.customerId)
    .subscribe((res) => {
      this.customerAddress = res.CustBillAddressObject;
    });
  }

  /**
   * function : confirmOrder
   * purpose  : confirm order and navigating to the order-confirmation page
   */

  public confirmOrder(){
    if(confirm('Are you sure want to confirm order')){
    this.spinner.show();
    this.orderService.confirmOrder(this.loginres.AuthenticateUser.userId).subscribe((res)=>{
      this.router.navigate(['order-confirmation']);
    }, err => { this.spinner.hide(); }, () => {this.spinner.hide(); });
    }
  }

  ngOnDestroy(): void {
    // sessionStorage.removeItem('orderDetails');
  }

}
