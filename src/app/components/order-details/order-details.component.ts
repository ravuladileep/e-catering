import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public orderDetails: FormGroup;
  public stateList = [];
  public addressList = [];
  keyword = 'street';

  constructor(private fb: FormBuilder,
              private router: Router,
              private date: DatePipe,
              private cartService: CartService,
              private orderService: OrderService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.orderDetailsForm();
    this.getStateList();
    this.getAddressList();
  }

  orderDetailsForm(): void {
    this.orderDetails = this.fb.group({
      orderNumber: ['', Validators.required],
      orderName : ['', Validators.required],
      orderType : ['Delivery', Validators.required],
      date : ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', [Validators.required,
                   Validators.minLength(10),
                   Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      street : ['', Validators.required],
      suite : [''],
      city : ['', Validators.required],
      state : ['', Validators.required],
      zipCode : ['', Validators.required],
      notes : [''],
    });
    const loginres = JSON.parse(sessionStorage.getItem('loginResponse'));
    const repeatOrderres = JSON.parse(sessionStorage.getItem('repeatOrderData'));
    if(loginres){
    this.orderDetails.get('orderNumber').setValue(loginres.AuthenticateUser.newOrderId);
    }
    if(repeatOrderres){
      this.orderDetails.get('orderNumber').setValue(repeatOrderres.OrderDetails.OrderId);
    }
  }

  public selectChange(e){
    this.orderDetails.get('street').setValue(e.street);
    this.orderDetails.get('suite').setValue(e.suite);
    this.orderDetails.get('city').setValue(e.city);
    this.orderDetails.get('zipCode').setValue(e.zip);
    this.stateList.find((x)=>{
      if(x.name === e.state){
        this.orderDetails.get('state').setValue(x.id);
      }
    });
  }

  /**
   * function : getStateList
   * purpose : based on the user selected state assigning the id
   */

  public getStateList(){
    this.orderService.getStateList().subscribe((res)=>{
      this.stateList = res.StateList;
    });
  }

  /**
   * function : getAddressList
   * purpose : list of address for autofilling the address fields
   */
  public getAddressList(){
    this.orderService.getAddressList().subscribe((res) => {
      this.addressList = res.LocationAddress;
    });
  }

  get orderDetailsData() {
    return this.orderDetails.controls;
  }


  public Submit(): void {
    this.spinner.show();
    this.orderDetails.get('date').setValue(this.date.transform(this.orderDetails.value.date, 'MM/dd/yyyy hh:mm a'));
    let data = {OrderDetails : this.orderDetails.value, ...this.cartService.cart};
    let loginres = JSON.parse(sessionStorage.getItem('loginResponse'));
    if(loginres){
      data.OrderDetails['customerId'] = loginres.AuthenticateUser.customerId;
      data.OrderDetails['regUserId'] = loginres.AuthenticateUser.userId;
    }
    sessionStorage.setItem('orderDetails', JSON.stringify(this.orderDetails.value));
    console.log(data);
    this.orderService.saveOrderDetails(data).subscribe((res) => {
      sessionStorage.removeItem('repeatOrderData')
      console.log(res);
      this.router.navigate(['place-order']);
    }, err => { this.spinner.hide(); }, () => {this.spinner.hide(); });
  }
}
