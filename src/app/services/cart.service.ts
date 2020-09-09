import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public webServiceUrl;
  public cart = {
    menuItems : [],
    package   : [],
    combo     : []
  };


  constructor(private http: HttpClient){
  }
  getUrl(){
    this.webServiceUrl = localStorage.getItem('webServiceUrl');
  }
  getItems(): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/getItemsList?catererId=menuscat`);
  }

  getPackage(id): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/showPackageOrComboDetails?itemId=${id}&catererId=menuscat`);
  }

  getCombo(id): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/showComboDetails?itemId=${id}&catererId=menuscat`);
  }

  getPreviousOrders(): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/getMyOrderList?userId=1008&catererId=menuscat`);
  }

  saveOrderDetails(data): Observable<any>{
    this.getUrl();
    return this.http.post(`${this.webServiceUrl}/saveOrderDetails?catererId=menusdev`, data);
  }

  increaseItemQuantity(itemId){
    this.cart.menuItems.map((x) => {
      if (x.itemId === itemId) {
        x.quantity++;
      }
    });
  }
}
