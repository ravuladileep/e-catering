import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.loginres = JSON.parse(sessionStorage.getItem('loginResponse'));
    this.getCustomerAdress();
    this.orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));
  }


  getCustomerAdress(){
    this.cartService.getCustomerAddress(this.loginres.AuthenticateUser.customerId)
    .subscribe((res) => {
      this.customerAddress = res.CustBillAddressObject;
    });
  }
  confirmOrder(){
    this.spinner.show();
    this.cartService.confirmOrder(this.loginres.AuthenticateUser.userId).subscribe((res)=>{
      this.router.navigate(['order-confirmation']);
    }, err => { this.spinner.hide(); }, () => {this.spinner.hide();});
  }

  ngOnDestroy(): void {
    // sessionStorage.removeItem('orderDetails');
  }

}
