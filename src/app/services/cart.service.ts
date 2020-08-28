import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public webServiceUrl;
  public cartItems = [];


  constructor(private http: HttpClient){
  }
  getUrl(){
    this.webServiceUrl = localStorage.getItem('webServiceUrl');
  }
  getItems(): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/getItemsList?catererId=menuscat`);
  }

  getComboItems(id): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/showPackageOrComboDetails?itemId=${id}&catererId=menuscat`);
  }

  increaseItemQuantity(itemId){
    this.cartItems.map((x) => {
      if (x.itemId === itemId) {
        x.quantity++;
      }
    });
  }
}
