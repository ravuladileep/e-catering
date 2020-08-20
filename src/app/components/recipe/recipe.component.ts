import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  public searchTerm;
  public reviewOrdersCount = 0;
  public items = [
    {
      subsection: [
        {
        name: 'GRILLED MARINATED FLANK STEAK: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: 45,
        quantity:1
        },
        {
        name: 'LEMON DIJON CRUSTED SALMON: GF, DF',
        description: 'With Blistered Tomatoes (Serves 4)',
        price: 30,
        quantity:1
        },
        {
        name: 'Red and White Tortellini.: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: 47,
        quantity:1
        },
        {
        name: 'Classic Meatloaf: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: 55,
        quantity:1
        }]
    },
    {
      subsection: [
        {
        name: 'Baked Honey Mustard Chicken: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: 60,
        quantity:1
        },
        {
        name: 'LEMON DIJON CRUSTED SALMON: GF, DF',
        description: 'With Blistered Tomatoes (Serves 4)',
        price: 80,
        quantity:1
        },
        {
        name: 'Meatball Stew Casserole: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: 31,
        quantity:1
        },
        {
        name: 'GRILLED MARINATED FLANK STEAK: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: 60,
        quantity:1
        }]
    }

  ];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.calcReviewCount()
  }


  addToCart(product) {
    const productExistInCart = this.cartService.cartItems.find(({name}) => name === product.name);
    if (!productExistInCart) {
      this.cartService.cartItems.push({...product});
      return;
    }
    this.cartService.increaseItemQuantity(product.name)
    this.calcReviewCount()
  }

  calcReviewCount(){
    let count = []
    this.cartService.cartItems.forEach((x)=>{
      count.push(+x.quantity)
    });
    this.reviewOrdersCount = count.reduce((a, b) => a + b, 0)
  }
}
