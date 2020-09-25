import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'E-Catering';
  public baseUrl = 'assets/url.json';
  public res;
  constructor(private router: Router,
              private http: HttpClient,
              private cartService: CartService,
              private orderService: OrderService){}
  ngOnInit(): void {
    this.http.get(this.baseUrl).subscribe((res)=>{
      this.res = res;
      sessionStorage.setItem('captchaKey', this.res.captchaKey);
      let webService = this.res.webserviceUrl;
      localStorage.setItem('webServiceUrl', webService);
      this.cartService.getUrl();
      this.gettemp();
    });
  }

  gettemp(){
    this.orderService.getTemplate().subscribe(res => {
    sessionStorage.setItem('templateValue', JSON.stringify(res));
    if (res.templatevalue === 1){
      this.router.navigate(['home']);
    }else {
      this.router.navigate(['cater-theme-one']);
    }
  });
}
}
