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
  keyword = 'name';
  public countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
    selectEvent(item) {
  }

  onChangeSearch(search: string) {
  }

  onFocused(e) {
  }


}
