import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
declare var $:any;

@Component({
  selector: 'app-combo-dialog',
  templateUrl: './combo-dialog.component.html',
  styleUrls: ['./combo-dialog.component.scss']
})
export class ComboDialogComponent implements OnInit {
  public comboData;
  public comboQuantity;
  public packNames = [];
  public itemsList = [];
  public product; // coming from component reciepe component as intial value
  constructor(private cartService: CartService, private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.getComboItems(this.product.itemId);
  }

  public getComboItems(itemId): void {
    this.cartService.getCombo(itemId)
    .subscribe((data) => {
      this.comboData = data;
      this.removeDuplicate();
    });
  }

  /**
   * function : removeDuplicate
   * purpose  : this function used for ngFor to display the packageitems and menu items
   */

  removeDuplicate(){
    let temp = [];
    let temp2 = [];
    this.comboData.ComboItems.forEach(x => {
      if(x.packageId !== '0') {
        temp.push(x.packName);
      }
      if(x.packageId === '0') {
        temp2.push(x);
      }
    });
    this.packNames = [...new Set(temp)];
    this.itemsList = temp2;
  }

  onSave(){
    // console.log($('#1516').val()) to get value
    this.comboData.ComboItems.forEach((x)=>{
        x['itemQty'] = $(`#${x.itemId}`).val();
    });
    this.cartService.cart.combo.push(this.comboData)
  }

  takeOrder(){
    this.cartService.cart.combo.find(
      ({ ComboDetails, ComboItems }) => {
        if(ComboDetails.comboId === this.comboData.ComboDetails.comboId) {
          ComboDetails =  this.comboData.ComboDetails;
          ComboItems = this.comboData.ComboItems;
        }
      }
    );
    const productExistInCart = this.cartService.cart.combo.find(
      ({ ComboDetails }) => ComboDetails.comboId ===  this.comboData.ComboDetails.comboId);

    if(!productExistInCart){
      this.cartService.cart.combo.push(this.comboData);
    }
  }

}
