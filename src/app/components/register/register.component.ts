import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public register: FormGroup;
  public siteKey = sessionStorage.getItem('captchaKey');
  public size = 'Normal';
  public theme = 'Light';
  public type = 'Image';
  public lang = 'en';
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm();
    console.log(this.siteKey, 'sitekey');
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
      recaptcha: ['', Validators.required]
    });
  }

  handleSuccess(event): void {
    console.log(event);
  }

  submit(): void{
    console.log(this.register.value);
  }

}
