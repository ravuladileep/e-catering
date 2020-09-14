import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

declare var $: any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public category;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    let temp = [];
    this.cartService.getItems().subscribe(res => {
      res.itemsList.forEach(element => {
        temp.push(element.sectionName);
      });
      this.category = [...new Set(temp)];
    });
  }
  icontoggle() {
    $('#sidebar-wrapper').toggleClass('hide');
    }

}
