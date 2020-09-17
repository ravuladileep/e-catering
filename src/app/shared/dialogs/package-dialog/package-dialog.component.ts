import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ValidationAlertDialogComponent } from '../validation-alert-dialog/validation-alert-dialog.component';
declare var $:any;

@Component({
  selector: 'app-package-dialog',
  templateUrl: './package-dialog.component.html',
  styleUrls: ['./package-dialog.component.scss']
})
export class PackageDialogComponent implements OnInit, OnDestroy {
  public packageData;
  public packQuantity;
  public packItemQuantity = [];
  public itemsTotalQuantity;
  public product; // coming from component reciepe component as intial value
  constructor(private cartService: CartService, private modalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getComboItems(this.product.itemId);
  }

  public getComboItems(itemId): void {
    this.cartService.getPackage(itemId)
    .subscribe((data) => {
      this.packageData = data;
      this.packageData.PackageDetails.PkgQty = 1;
      this.packQuantity =  +this.packageData.PackageDetails.PkgQty;
      this.assignQuantity();
    });
  }

  changeTotalQty(e){
    this.packQuantity = +e.target.value;
  }

  closeModal(){
    this.modalRef.hide();
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
            // this.packQuantity =  this.packageData.PackageDetails.PkgQty;
            $(`#pkgqty`).val(+this.packageData.PackageDetails.PkgQty);
            this.packQuantity =  +$(`#pkgqty`).val()
            // pkgqty
            this.packageData.PackageItems.forEach((x,i)=>{
              $(`#${x.pkgItemId}`).val(+x.pkgItemQty);
            });
          }
        }
      );
    }
  }

  onSave(): void {
    this.cartService.cart.package.forEach((x,i)=>{
      if(this.packageData.PackageDetails.packageId === x.PackageDetails.packageId){
        sessionStorage.setItem('tempPackageData', JSON.stringify(this.cartService.cart.package[i]));
      }
    });

    // assing the quantities onSubmit
    this.packageData.PackageDetails.PkgQty = +$(`#pkgqty`).val();
    this.packageData.PackageItems.forEach((x,i) => {
      x['pkgItemQty'] = +$(`#${x.pkgItemId}`).val();
    });

    // validating whether total quantity lessthan the packageqty
    let Total = []
    this.packageData.PackageItems.forEach((x) => {
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
      && this.itemsTotalQuantity == this.packageData.PackageDetails.PkgQty){
        this.takeOrder();
      }else {
        if(this.packageData?.PackageDetails?.pkgMinItems !== this.packageData?.PackageDetails?.pkgMaxItems){
          this.modalService.show(ValidationAlertDialogComponent, {
            class: 'modal-dialog-custom ',
            initialState: { message : `Please select between ${this.packageData?.PackageDetails?.pkgMinItems} and ${this.packageData?.PackageDetails?.pkgMaxItems} items from this list. The total item quantity should be equal to  ${this.packQuantity}.` },
            keyboard: false,
          });
          this.onValidationError();
          // alert(`Please select between ${this.packageData?.PackageDetails?.pkgMinItems} and ${this.packageData?.PackageDetails?.pkgMaxItems} items from this list. The total item quantity should be equal to  ${this.packQuantity}.`);
        }else{
          this.modalService.show(ValidationAlertDialogComponent, {
            class: 'modal-dialog-custom ',
            initialState: { message : `Please select ${this.packageData?.PackageDetails?.pkgMinItems} item(s) from this list. The total item quantity should be  equal to  ${this.packQuantity}.` },
            keyboard: false,
          });
          this.onValidationError();
          // alert(`Please select ${this.packageData?.PackageDetails?.pkgMinItems} item(s) from this list. The total item quantity should be  equal to  ${this.packQuantity}.`);
        }
      }
    }


    if(this.packageData.PackageDetails.packageType === '1' &&
    this.packageData.PackageDetails.pkgMaxItems === '0' &&
    this.packageData.PackageDetails.pkgMinItems === '0') {
     if(this.itemsTotalQuantity == this.packageData.PackageDetails.PkgQty){
       this.takeOrder();
     }else {
      this.modalService.show(ValidationAlertDialogComponent, {
        class: 'modal-dialog-custom ',
        initialState: { message : `Total items quantity should  equal to ${this.packageData.PackageDetails.PkgQty}` },
        keyboard: false,
      });
      this.onValidationError();
      //  alert(`Total items quantity should  equal to ${this.packageData.PackageDetails.PkgQty}`);
     }
    }


    if(this.packageData.PackageDetails.packageType === '0') {
       this.takeOrder();
    }

  }

  onValidationError(){
    let data = JSON.parse(sessionStorage.getItem('tempPackageData'));
    this.cartService.cart.package.forEach((x,i)=>{
      if(x.PackageDetails.packageId === data.PackageDetails.packageId){
        this.cartService.cart.package[i] = JSON.parse(sessionStorage.getItem('tempPackageData'));
      }
    });
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
    this.modalRef.hide();
  }

  ngOnDestroy(){
    sessionStorage.removeItem('tempPackageData')
  }

}
