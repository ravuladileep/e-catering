import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { ComboDialogComponent } from 'src/app/shared/dialogs/combo-dialog/combo-dialog.component';
import { PackageDialogComponent } from 'src/app/shared/dialogs/package-dialog/package-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-cater-theme-one-items',
  templateUrl: './cater-theme-one-items.component.html',
  styleUrls: ['./cater-theme-one-items.component.scss']
})
export class CaterThemeOneItemsComponent implements OnInit, DoCheck {

  public newMenu = [];
  public subSectionMenu = [];
  public reviewOrdersCount;
  public searchTerm;

  constructor(private cartService: CartService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getItems();
  }

  public getItems(): void {
    this.spinner.show();
    this.cartService
      .getItems()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.newMenu = res.itemsList;
        this.assignQuantity();
      });
  }

  ngDoCheck(){
    this.cartService.subSectionId$.subscribe((res) => {
      this.subSectionMenu = this.newMenu.filter(x => x.subSectionId === res);
    });
    this.assignPackageQty();
    this.assignComboQty();
    this.calcReviewCount();
  }

  /**
   * function : assignQuantity
   * purpose  : if already cart contains
   * any items assign those items quanity to the menulist
   */
  public assignQuantity(): void {
    if (this.cartService.cart.menuItems.length) {
      this.cartService.cart.menuItems.forEach((cartItem) => {
        this.newMenu.forEach((menuItem) => {
          if (cartItem.itemId === menuItem.itemId) {
            menuItem.quantity = +cartItem.quantity;
          }
        });
      });
    }
  }

  /**
   * function : assignPackageQty
   * purpose  : when package modal open and close updating the quantity in menuitems
   */

  public assignPackageQty(){
    this.cartService.cart.package.forEach((cartItem) => {
      this.newMenu.forEach((menuItem) => {
        if (cartItem.PackageDetails.EcateringItemId === menuItem.itemId) {
          menuItem.quantity = +cartItem.PackageDetails.PkgQty;
        }
      });
    });
  }

  /**
   * function : assignComboQty
   * purpose  : when combo modal open and close updating the quantity in menuitems
   */

  public assignComboQty(){
    this.cartService.cart.combo.forEach((cartItem) => {
      this.newMenu.forEach((menuItem) => {
        if (cartItem.ComboDetails.EcateringItemId === menuItem.itemId) {
          menuItem.quantity = +cartItem.ComboDetails.comboQty;
        }
      });
    });
  }

  /**
   * function : addToCart
   * purpose  : adding the item to Cart (if already cart contain same item it will increase quantity)
   * @param product
   */

  public addToCart(product) {
    // combo
    if (product.packageComboFlag === 2) {
      this.modalService.show(ComboDialogComponent, {
       class: 'modal-dialog-custom modal-lg modal-dialog-centered',
       initialState: { product },
       keyboard: false,
     });
   }

  //  package

    if (product.packageComboFlag === 1) {
     this.modalService.show(PackageDialogComponent, {
        class: 'modal-dialog-custom modal-lg modal-dialog-centered',
        initialState: { product },
        keyboard: false,
      });
    }

    // menuitem
    if (product.packageComboFlag === 0){
      product.quantity++;
      const productExistInCart = this.cartService.cart.menuItems.find(
        ({ itemId }) => itemId === product.itemId
      );
      if (!productExistInCart) {
        this.cartService.cart.menuItems.push({ ...product });
        return;
      }
      this.cartService.increaseItemQuantity(product.itemId);
      // this.calcReviewCount();
    }
  }

  /**
   * function : decreaseQuantity
   * purpose  : removing the item from Cart (if already cart contain same item it will decrease quantity)
   * @param product
   */

  public decreaseQuantity(product) {

    // decreasing if product is combo
    if (product.packageComboFlag === 2) {
      if (product.quantity === 1){
        this.cartService.cart.combo.forEach((cartItem, i) => {
          if (cartItem.ComboDetails.EcateringItemId === product.itemId) {
            this.cartService.cart.combo.splice(i, 1);
          }
        });
        }else {
          this.modalService.show(ComboDialogComponent, {
            class: 'modal-dialog-custom modal-lg modal-dialog-centered',
            initialState: { product },
            keyboard: false,
          });
        }
      }

    // decreasing if product is package
    if (product.packageComboFlag === 1) {
      if (product.quantity === 1){
        this.cartService.cart.package.forEach((cartItem, i) => {
          if (cartItem.PackageDetails.EcateringItemId === product.itemId) {
            this.cartService.cart.package.splice(i, 1);
          }
        });
        }else {
          this.modalService.show(PackageDialogComponent, {
            class: 'modal-dialog-custom modal-lg modal-dialog-centered',
            initialState: { product },
            keyboard: false,
          });
        }
      }

    product.quantity--;
    if (product.quantity === 0) {
      this.cartService.cart.menuItems.forEach((x, i) => {
        if (x.itemId === product.itemId) {
          this.cartService.cart.menuItems.splice(i, 1);
        }
      });
    } else {
      this.cartService.cart.menuItems.forEach((x, i) => {
        if (x.itemId === product.itemId) {
          this.cartService.cart.menuItems[i].quantity--;
        }
      });
    }

  }

  /**
   * function : calcReviewCount
   * purpose  : calculating the total quantity
   * @param product
   */

  public calcReviewCount() {
    let count = [];
    this.cartService.cart.menuItems.forEach((x) => {
      count.push(+x.quantity);
    });
    this.cartService.cart.package.forEach((x) => {
      count.push(+x.PackageDetails.PkgQty);
    });
    this.cartService.cart.combo.forEach((x) => {
      count.push(+x.ComboDetails.comboQty);
    });
    this.reviewOrdersCount = count.reduce((a, b) => a + b, 0);
  }


}
