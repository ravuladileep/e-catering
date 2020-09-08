import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-package-dialog',
  templateUrl: './package-dialog.component.html',
  styleUrls: ['./package-dialog.component.scss']
})
export class PackageDialogComponent implements OnInit {
  public packageData;
  public packQuantity;
  public packItemQuantity = [];
  public itemsTotalQuantity;
  public product; // coming from component reciepe component as intial value
  constructor(private cartService: CartService, private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.getComboItems(this.product.itemId);
  }

  public getComboItems(itemId): void {
    this.cartService.getPackage(itemId)
    .subscribe((data) => {
      this.packageData = data;
      this.packageData.PackageDetails.PkgQty = 1;
      this.packQuantity =  this.packageData.PackageDetails.PkgQty;
      this.assignQuantity();
    });
  }

/**
 * function : assignQuantity
 * purpose : if the selected item already in the cart we are assigning the quantity on load
 */
  assignQuantity(){
    if(this.cartService.cart.package.length){
      this.cartService.cart.package.find(
        ({ PackageDetails, PackageItems }) => {
          if(PackageDetails.packageId === this.packageData.PackageDetails.packageId) {
            this.packageData.PackageDetails = PackageDetails;
            this.packageData.PackageItems = PackageItems;
            this.packQuantity =  this.packageData.PackageDetails.PkgQty;
            this.packageData.PackageItems.forEach((x,i)=>{
              this.packItemQuantity[i] = x.pkgItemQty;
            });
          }
        }
      );
    }
  }

  onSave(): void {
    // assing the quantities onSubmit
    this.packageData.PackageDetails.PkgQty = +this.packQuantity;
    this.packageData.PackageItems.forEach((x,i) => {
      x['pkgItemQty'] = this.packItemQuantity[i];
    });

    // validating whether total quantity lessthan the packageqty
    let Total = []
    this.packageData.PackageItems.forEach((x)=>{
      if(x.pkgItemQty !== undefined){
      Total.push(x.pkgItemQty);
      }
    });
    this.itemsTotalQuantity = Total.reduce((a, b) => a + b, 0);


    if(this.packageData.PackageDetails.packageType === '1' &&
     this.packageData.PackageDetails.pkgMaxItems !== '0' &&
     this.packageData.PackageDetails.pkgMinItems !== '0') {
      if(this.packageData.PackageItems.filter(x => x.pkgItemQty > 0).length >=  this.packageData.PackageDetails.pkgMinItems
      && this.packageData.PackageItems.filter(x => x.pkgItemQty > 0).length <=  this.packageData.PackageDetails.pkgMaxItems
      && this.itemsTotalQuantity <= this.packageData.PackageDetails.PkgQty){
        this.takeOrder();
        this.modalRef.hide();
      }else {
        alert(`Total items quantity should lessthan or equal to ${this.packageData.PackageDetails.PkgQty} and should select min ${this.packageData.PackageDetails.pkgMinItems} & max ${this.packageData.PackageDetails.pkgMaxItems} different items`);
      }
    }


    if(this.packageData.PackageDetails.packageType === '1' &&
    this.packageData.PackageDetails.pkgMaxItems === '0' &&
    this.packageData.PackageDetails.pkgMinItems === '0') {
     if(this.itemsTotalQuantity <= this.packageData.PackageDetails.PkgQty){
       this.takeOrder();
       this.modalRef.hide();
     }else {
       alert(`Total items quantity should lessthan or equal to ${this.packageData.PackageDetails.PkgQty}`);
     }
    }


    if(this.packageData.PackageDetails.packageType === '0') {
       this.takeOrder();
       this.modalRef.hide();
    }

  }


  takeOrder(){
    this.cartService.cart.package.find(
      ({ PackageDetails, PackageItems }) => {
        if(PackageDetails.packageId === this.packageData.PackageDetails.packageId) {
            PackageDetails =  this.packageData.PackageDetails;
            PackageItems = this.packageData.PackageItems;
        }
      }
    );
    const productExistInCart = this.cartService.cart.package.find(
      ({ PackageDetails }) => PackageDetails.packageId === this.packageData.PackageDetails.packageId);

    if(!productExistInCart){
      this.cartService.cart.package.push(this.packageData);
    }
  }



}
