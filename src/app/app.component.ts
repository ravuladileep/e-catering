import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'E-Catering';
  public baseUrl = 'assets/url.json';
  public res;
  constructor(private router: Router, private http: HttpClient, private cartService: CartService){}
  ngOnInit(): void {
    this.http.get(this.baseUrl).subscribe((res)=>{
      this.res = res;

      let webService = this.res.webserviceUrl;
      localStorage.setItem('webServiceUrl', webService);
      this.cartService.getUrl();
    })
  }
}
