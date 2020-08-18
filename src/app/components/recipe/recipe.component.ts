import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  public searchTerm;
  public items = [
    {
      subsection: [
        {
        name: 'GRILLED MARINATED FLANK STEAK: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: '$45.00'
        },
        {
        name: 'LEMON DIJON CRUSTED SALMON: GF, DF',
        description: 'With Blistered Tomatoes (Serves 4)',
        price: '$45.00'
        },
        {
        name: 'Red and White Tortellini.: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: '$45.00'
        },
        {
        name: 'Classic Meatloaf: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: '$45.00'
        }]
    },
    {
      subsection: [
        {
        name: 'Baked Honey Mustard Chicken: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: '$45.00'
        },
        {
        name: 'LEMON DIJON CRUSTED SALMON: GF, DF',
        description: 'With Blistered Tomatoes (Serves 4)',
        price: '$45.00'
        },
        {
        name: 'Meatball Stew Casserole: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: '$45.00'
        },
        {
        name: 'GRILLED MARINATED FLANK STEAK: GF, DF, NF',
        description: 'With Smoked Tomato BBO Glaze (Serves 4)',
        price: '$45.00'
        }]
    }

  ];
  constructor() { }

  ngOnInit(): void {
  }



}
