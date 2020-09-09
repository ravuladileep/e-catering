import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';

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
              private cartService: CartService) { }

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
      suite : ['', Validators.required],
      city : ['', Validators.required],
      state : ['', Validators.required],
      zipCode : ['', Validators.required],
      notes : ['', Validators.required],
    });
    const loginres = JSON.parse(sessionStorage.getItem('loginResponse'));
    if(loginres){
    this.orderDetails.get('orderNumber').setValue(loginres.AuthenticateUser.newOrderId);
    }
  }

  selectChange(e){
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

  getStateList(){
    this.cartService.getStateList().subscribe((res)=>{
      this.stateList = res.StateList;
    });
  }

  getAddressList(){
    this.cartService.getAddressList().subscribe((res) => {
      this.addressList = res.LocationAddress;
    });
  }

  get orderDetailsData() {
    return this.orderDetails.controls;
  }


  Submit(): void {
    this.orderDetails.get('date').setValue(this.date.transform(this.orderDetails.value.date, 'MM/dd/yyyy hh:mm a'));
    let data = {OrderDetails : this.orderDetails.value, ...this.cartService.cart};
    let loginres = JSON.parse(sessionStorage.getItem('loginResponse'));
    if(loginres){
      data.OrderDetails['customerId'] = loginres.AuthenticateUser.customerId;
      data.OrderDetails['regUserId'] = loginres.AuthenticateUser.userId;
    }
    console.log(data);
    this.cartService.saveOrderDetails(data).subscribe((res) => {
      console.log(res);
    });
    sessionStorage.setItem('orderDetails', JSON.stringify(this.orderDetails.value));
    this.router.navigate(['place-order']);
  }
}
