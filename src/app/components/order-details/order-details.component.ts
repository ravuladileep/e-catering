import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public orderDetails: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.orderDetailsForm();
  }

  orderDetailsForm(): void {
    this.orderDetails = this.fb.group({
      orderName : ['', Validators.required],
      orderType : ['Delivery', Validators.required],
      Date : ['', Validators.required],
      street : ['', Validators.required],
      suite : ['', Validators.required],
      city : ['', Validators.required],
      state : ['', Validators.required],
      zipCode : ['', Validators.required],
      notes : ['', Validators.required],
    });
  }

  get orderDetailsData() {
    return this.orderDetails.controls;
  }


  Submit(): void {
    // this.orderDetails.controls['Date'].setValue(new Date(this.orderDetails.controls['Date'].value));
    console.log(this.orderDetails.value);
    localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails.value))
    // this.router.navigate(['home']);
  }


}
