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
export class PackageDialogComponent implements OnInit {
  public packageData;
  public packageData2; // is for original pkgitemqty when packagetype =0 multiply with total quantity
  public packQuantity;
  public packItemQuantity = [];
  public itemsTotalQuantity;
  public showSummary = false;
  public product; // coming from component reciepe component as intial value
  constructor(private cartService: CartService, private modalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getComboItems(this.product.itemId);
  }

  public getComboItems(itemId): void {
    this.cartService.getPackage(itemId)
    .subscribe((data) => {
      this.packageData = data;
      this.packageData2 = JSON.parse(JSON.stringify(data));
      this.packageData.PackageDetails.PkgQty = 1;
      this.packQuantity =  +this.packageData.PackageDetails.PkgQty;
      this.assignQuantity();
    });
  }

  changeTotalQty(e){
    this.packQuantity = +e.target.value;
    if(this.packageData.PackageDetails.packageType === '0' && this.packQuantity > 0){
    this.packageData2.PackageItems.forEach((x)=>{
      $(`#${x.pkgItemId}`).val(+x.pkgItemQty * this.packQuantity);
    });
  }
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
            this.packageData['PackageDetails'] = JSON.parse(JSON.stringify(PackageDetails));
            this.packageData['PackageItems'] = JSON.parse(JSON.stringify(PackageItems));
            // this.packQuantity =  this.packageData.PackageDetails.PkgQty;
            $(`#pkgqty`).val(+this.packageData.PackageDetails.PkgQty);
            this.packQuantity =  +$(`#pkgqty`).val();
            // pkgqty
            this.packageData.PackageItems.forEach((x,i)=>{
              $(`#${x.pkgItemId}`).val(+x.pkgItemQty);
            });
          }
        }
      );
    }
  }


  onConfirm(){
    // this.showSummary = true;
    // this.packageData.PackageDetails.PkgQty = +$(`#pkgqty`).val();
    // this.packageData.PackageItems.forEach((x,i) => {
    //   x['pkgItemQty'] = +$(`#${x.pkgItemId}`).val();
    // });
    this.showSummary = false;
    this.takeOrder();
  }

  onSave(): void {
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
        // this.takeOrder();
        this.showSummary = true;
      }else {
        if(this.packageData?.PackageDetails?.pkgMinItems !== this.packageData?.PackageDetails?.pkgMaxItems){
          this.modalService.show(ValidationAlertDialogComponent, {
            class: 'modal-dialog-custom ',
            initialState: { message : `Please select between ${this.packageData?.PackageDetails?.pkgMinItems} and ${this.packageData?.PackageDetails?.pkgMaxItems} items from this list. The total item quantity should be equal to  ${this.packQuantity}.` },
            keyboard: false,
          });
          // alert(`Please select between ${this.packageData?.PackageDetails?.pkgMinItems} and ${this.packageData?.PackageDetails?.pkgMaxItems} items from this list. The total item quantity should be equal to  ${this.packQuantity}.`);
        }else{
          this.modalService.show(ValidationAlertDialogComponent, {
            class: 'modal-dialog-custom ',
            initialState: { message : `Please select ${this.packageData?.PackageDetails?.pkgMinItems} item(s) from this list. The total item quantity should be  equal to  ${this.packQuantity}.` },
            keyboard: false,
          });
          // alert(`Please select ${this.packageData?.PackageDetails?.pkgMinItems} item(s) from this list. The total item quantity should be  equal to  ${this.packQuantity}.`);
        }
      }
    }


    if(this.packageData.PackageDetails.packageType === '1' &&
    this.packageData.PackageDetails.pkgMaxItems === '0' &&
    this.packageData.PackageDetails.pkgMinItems === '0') {
     if(this.itemsTotalQuantity == this.packageData.PackageDetails.PkgQty){
      //  this.takeOrder();
      this.showSummary = true;
     }else {
      this.modalService.show(ValidationAlertDialogComponent, {
        class: 'modal-dialog-custom ',
        initialState: { message : `Total items quantity should  equal to ${this.packageData.PackageDetails.PkgQty}` },
        keyboard: false,
      });
      //  alert(`Total items quantity should  equal to ${this.packageData.PackageDetails.PkgQty}`);
     }
    }


    if(this.packageData.PackageDetails.packageType === '0') {
      //  this.takeOrder();
      this.showSummary = true;
    }

  }



  takeOrder(){
    this.cartService.cart.package.forEach((x,i)=>{
      if(this.packageData.PackageDetails.packageId === x.PackageDetails.packageId){
       this.cartService.cart.package[i] = this.packageData;
      }
    });
    const productExistInCart = this.cartService.cart.package.find(
      ({ PackageDetails }) => PackageDetails.packageId === this.packageData.PackageDetails.packageId);

    if(!productExistInCart){
      this.cartService.cart.package.push(this.packageData);
    }
    this.modalRef.hide();
  }


}
