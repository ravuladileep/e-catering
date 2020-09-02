import { Component, OnInit, DoCheck } from '@angular/core';
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
  // public comboQuantity;
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
      console.log(data)
      this.comboData = data;
      this.removeDuplicate();
      this.assignQuantity();
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

  /**
   * function : assignQuantity
   * purpose : if the selected item already in the cart we are assigning the quantity on load
   */
  assignQuantity(){
    if(this.cartService.cart.combo.length){
      this.cartService.cart.combo.find(
        ({ ComboDetails, ComboItems }) => {
          if(ComboDetails.comboId === this.comboData.ComboDetails.comboId) {
            this.comboData.ComboDetails = ComboDetails;
            this.comboData.ComboItems = ComboItems;
            $(`#comboqtyid`).val(+this.comboData.ComboDetails.comboQty);
            this.comboData.ComboItems.forEach((x) => {
              if(x.packageId !== '0'){
                 $(`#${x.itemId}`).val(x.itemQty);
              }
            });
          }
        }
      );
    }
  }

  changeItemsQuantity(e){
    this.itemsList.forEach((x)=>{
      if(e.target.value > 0){
      $(`#${x.itemId}`).val(+x.itemQty * e.target.value);
      }
    });
  }

  onSave(){
    this.comboData.ComboDetails.comboQty =  +$(`#comboqtyid`).val();
    this.comboData.ComboItems.forEach((x)=>{
      if(x.packageId !== '0'){
        x['itemQty'] = $(`#${x.itemId}`).val();
      }
      if(x.packageId === '0'){
        x['itemQty'] = $(`#${x.itemId}`).val();
      }
    });


    let group = this.comboData.ComboItems.reduce((acc, item) => {
      if (!acc[item.packName]) {
        if (item.packageId !== '0') {
          acc[item.packName] = [];
        }
      }
      if (item.packageId !== '0') {
        acc[item.packName].push(item);
      }
      return acc;
    }, {});

    let itemsForValidation = [];
    itemsForValidation.push(Object.values(group))
    console.log(itemsForValidation);

    let result = [];
    itemsForValidation.forEach((x,i)=>{
      x.forEach(item => {
        if(item.filter(y => y.itemQty > 0).length >= item[i].minItems &&
        item.filter(y => y.itemQty > 0).length <= item[i].maxItems &&
        item.reduce((a, b) => a + b, 0) <= +this.comboData.ComboDetails.comboQty
        ){
          result.push(true);
        }else{
          result.push(false);
        }
      });
    });

    if(result.includes(false)){
      console.log('err')
    }else {
      console.log('take order')
    }

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
