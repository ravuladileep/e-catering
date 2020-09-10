import {
  Component,
  OnInit,
  DoCheck,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { fromEvent, interval, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PackageDialogComponent } from 'src/app/shared/dialogs/package-dialog/package-dialog.component';
import { ComboDialogComponent } from 'src/app/shared/dialogs/combo-dialog/combo-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent
  implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;
  public reviewOrdersCount;
  public newMenu = [];
  public category = [];
  public subCategory = [];
  public loading = false;

  constructor(
    private cartService: CartService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.calcReviewCount();
    this.getItems();
  }


  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        untilDestroyed(this),
        map((evt: any) => evt.target.value),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        if (!text) {
          this.getItems();
        } else {
          this.spinner.show();
          this.loading = true;
          this.cartService
            .getItems()
            .pipe(untilDestroyed(this))
            .subscribe(
              (res) => {
                let filteredItems;
                filteredItems = res.itemsList.filter(
                  (item) =>
                    item.itemName.toLowerCase().indexOf(text.toLowerCase()) > -1
                );
                this.newMenu = filteredItems;
                if (this.cartService.cart.menuItems.length) {
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
              },
              (err) => {
                this.loading = false;
                this.spinner.hide();
              },
              () => {
                this.loading = false;
                this.spinner.hide();
              }
            );
        }
      });
  }

  /**
   * function : getItems
   * purpose  : getting menuItems to display and if already cart contains
   * any items assign those items quanity to the menulist
   */

  public getItems(): void {
    this.spinner.show();
    this.loading = true;
    this.cartService
      .getItems()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          this.newMenu = res.itemsList;
          if (this.cartService.cart.menuItems.length) {
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
        },
        (err) => {
          this.loading = false;
          this.spinner.hide();
        },
        () => {
          this.loading = false;
          this.spinner.hide();
        }
      );
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

  ngDoCheck() {
    this.calcReviewCount();
  }

  /**
   * function : addToCart
   * purpose  : adding the item to Cart (if already cart contain same item it will increase quantity)
   * @param product
   */

  public addToCart(product) {
    if (product.packageComboFlag === 2) {
      this.modalService.show(ComboDialogComponent, {
       class: 'modal-dialog-custom modal-lg modal-dialog-centered',
       initialState: { product },
       keyboard: false,
     });
   }

    if (product.packageComboFlag === 1) {
       this.modalService.show(PackageDialogComponent, {
        class: 'modal-dialog-custom modal-lg modal-dialog-centered',
        initialState: { product },
        keyboard: false,
      });
    }
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
      this.calcReviewCount();
    }
  }

  /**
   * function : decreaseQuantity
   * purpose  : removing the item from Cart (if already cart contain same item it will decrease quantity)
   * @param product
   */

  public decreaseQuantity(product) {
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

  ngOnDestroy(): void {}
}
