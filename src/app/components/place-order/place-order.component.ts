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
  public totalAmount;
  public taxAmount;
  constructor(private cartService: CartService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.loginres = JSON.parse(sessionStorage.getItem('loginResponse'));
    this.getCustomerAdress();
    this.orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));
    this.totalAmount = this.cartService.cartTotalAmount();
    this.getTax();
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
   * function : getCustomerAdress
   * purpose  : getting the customer address to display left side of the place order screen
   */

  public getTax(){
    this.orderService.getTaxAmount(this.loginres.AuthenticateUser.newOrderId)
    .subscribe((data) => {
      let tax = data;
      this.taxAmount =  tax.countytaxamount + tax.statetaxamount + tax.othertaxamount;
    });
  }

  /**
   * function : confirmOrder
   * purpose  : confirm order and navigating to the order-confirmation page
   */

  public confirmOrder(){
    this.spinner.show();
    this.orderService.confirmOrder(this.loginres.AuthenticateUser.userId).subscribe((res)=>{
      this.router.navigate(['order-confirmation']);
    }, err => { this.spinner.hide(); }, () => {this.spinner.hide(); });
  }

  ngOnDestroy(): void {
    // sessionStorage.removeItem('orderDetails');
  }

}
