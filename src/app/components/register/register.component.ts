import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public register: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm();
  }

  registerForm(): void {
    this.register = this.fb.group({
      firstName : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      userName : ['', [Validators.required]],
      password : ['', [Validators.required]],
      confirmPassword : ['', [Validators.required]],
      email : ['', [Validators.required]],
      phone : ['', [Validators.required]],
      address : ['', [Validators.required]],
    });
  }

  submit(): void{
    console.log(this.register.value)
  }

}
