import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm();
  }

  loginForm(): void {
    this.login = this.fb.group({
      userName : ['', [Validators.required]],
      password : ['', [Validators.required]],
    });
  }

  submit(): void {
    console.log(this.login.value)
  }
}
