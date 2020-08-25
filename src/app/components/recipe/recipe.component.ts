import { Component, OnInit, DoCheck, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import {debounceTime, map, distinctUntilChanged} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComboItemDialogComponent } from 'src/app/shared/dialogs/combo-item-dialog/combo-item-dialog.component';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, DoCheck, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
    search: string;
  public reviewOrdersCount;
  public limit = 'showLess';
  public newMenu = [];
  public category;
  public subCategory;
  public loading = false;

  constructor(private cartService: CartService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService ) { }

  ngOnInit(): void {
    this.calcReviewCount();
    this.getItems();
  }


  ngAfterViewInit(){
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((evt: any) => evt.target.value),
      debounceTime(1000),
      distinctUntilChanged())
     .subscribe((text: string) => {
       if (!text){
         this.getItems();
       }else {
        this.spinner.show();
        this.loading = true;
        this.cartService.getItems().subscribe(res => {
          let filteredItems;
          filteredItems = res.itemsList.filter(
            item => item.itemName.toLowerCase().indexOf(text.toLowerCase()) > -1
         );
          this.newMenu = filteredItems;
          if (this.cartService.cartItems.length){
           this.assignQuantity();
          }
          let cat = new Map();
          let sub = new Map();
          for (let obj of filteredItems) {
            cat.set(obj.sectionName, obj);
            sub.set(obj.subSectionName, obj);
          }
          this.category = [...cat.values()];
          this.subCategory = [...sub.values()];
        }, err => {this.loading = false; this.spinner.hide(); }, () => {this.loading = false; this.spinner.hide(); });
      }
     });
  }



  getItems(): void {
    this.spinner.show();
    this.loading = true;
    this.cartService.getItems().subscribe(res => {
      this.newMenu = res.itemsList;
      if (this.cartService.cartItems.length){
       this.assignQuantity();
      }
      let cat = new Map();
      let sub = new Map();
      for (let obj of res.itemsList) {
        cat.set(obj.sectionName, obj);
        sub.set(obj.subSectionName, obj);
      }
      this.category = [...cat.values()];
      this.subCategory = [...sub.values()];
    }, err => {this.loading = false; this.spinner.hide(); }, () => {this.loading = false; this.spinner.hide(); });
  }

  assignQuantity(): void {
    if (this.cartService.cartItems.length) {
      this.cartService.cartItems.forEach((cartItem) => {
        this.newMenu.forEach(menuItem => {
          if (cartItem.itemId === menuItem.itemId){
            menuItem.quantity = +cartItem.quantity;
          }
        });
      });
    }
  }

  ngDoCheck(){
    this.calcReviewCount();
  }


  addToCart(product) {
    this.modalService.show(ComboItemDialogComponent, { class: 'modal-dialog-custom modal-dialog-centered',
    keyboard: false
  });
    product.quantity++;
    const productExistInCart = this.cartService.cartItems.find(({itemId}) => itemId === product.itemId);
    if (!productExistInCart) {
      this.cartService.cartItems.push({...product});
      return;
    }
    this.cartService.increaseItemQuantity(product.itemId);
    this.calcReviewCount();
  }

  decreaseQuantity(product){
    product.quantity--;
    if (product.quantity ===  0) {
      this.cartService.cartItems.forEach((x, i) => {
        if (x.itemId === product.itemId){
         this.cartService.cartItems.splice(i, 1);
        }
      });
    }else {
      this.cartService.cartItems.forEach((x, i) => {
        if (x.itemId === product.itemId){
         this.cartService.cartItems[i].quantity--;
        }
      });
    }
  }

  calcReviewCount(){
    let count = [];
    this.cartService.cartItems.forEach((x) => {
      count.push(+x.quantity);
    });
    this.reviewOrdersCount = count.reduce((a, b) => a + b, 0);
  }
}
