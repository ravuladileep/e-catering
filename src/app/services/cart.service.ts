import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
public cartItems = [];
  constructor() { }

  increaseItemQuantity(id){
    this.cartItems.map((x)=>{
      if(x.name === id) {
        x.quantity++
      }
    });
  }
}
