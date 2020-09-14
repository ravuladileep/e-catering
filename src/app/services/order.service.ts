import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public webServiceUrl;


  constructor(private http: HttpClient){
  }
  getUrl(){
    this.webServiceUrl = localStorage.getItem('webServiceUrl');
  }

  getPreviousOrders(userid): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/getMyOrderList?userId=${userid}&catererId=menuscat`);
  }

  saveOrderDetails(data): Observable<any>{
    this.getUrl();
    return this.http.post(`${this.webServiceUrl}/saveOrderDetails?catererId=menuscat`, JSON.stringify(data));
  }

  confirmOrder(orderId): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/confirmOrder?orderId=${orderId}&catererId=menuscat`);
  }

  getCustomerAddress(customerId): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/getCustomerAddresses?customerId=${customerId}&catererId=menuscat`);
  }

  getStateList(): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/getStateList?catererId=menuscat`);
  }

  getAddressList(): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/getLocationAddress?catererId=menuscat`);
  }

  repeatOrder(orderid): Observable<any>{
    this.getUrl();
    return this.http.get(`${this.webServiceUrl}/getRepeatOrderData?orderId=${orderid}&catererId=menuscat`);
  }

}
