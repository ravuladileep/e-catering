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
    return this.http.get(`${this.webServiceUrl}/showPackageDetails?itemId=${id}&catererId=menuscat`);
  }

  getCombo(id): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/showComboDetails?itemId=${id}&catererId=menuscat`);
  }


  increaseItemQuantity(itemId){
    this.cart.menuItems.map((x) => {
      if (x.itemId === itemId) {
        x.quantity++;
      }
    });
  }
}
