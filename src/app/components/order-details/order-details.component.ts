import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public orderDetails: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,  private date: DatePipe) { }

  ngOnInit(): void {
    this.orderDetailsForm();
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
  }

  get orderDetailsData() {
    return this.orderDetails.controls;
  }


  Submit(): void {
    console.log(this.orderDetails.value);
    sessionStorage.setItem('orderDetails', JSON.stringify(this.orderDetails.value))
    this.router.navigate(['place-order']);
  }
}
