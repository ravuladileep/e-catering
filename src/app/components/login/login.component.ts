import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login: FormGroup;
  public loginError;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm();
  }

  loginForm(): void {
    this.login = this.fb.group({
      userName : ['', [Validators.required]],
      password : ['', [Validators.required]],
    });
  }

  get loginData(){
    return this.login.controls;
  }

  submit(): void {
    this.spinner.show();
    this.authService.login(this.loginData.userName.value, this.loginData.password.value)
    .subscribe((res) => {
      if(res.userId === '0'){
        this.loginError = true;
        this.spinner.hide();
        return;
      }else {
        sessionStorage.setItem('loginResponse', JSON.stringify(res))
        console.log('login success',res)
        this.router.navigate(['order-details']);
        this.spinner.hide();
      }
    }, (err)=> {this.spinner.hide()}, ()=> {this.spinner.hide()});
  }
}
