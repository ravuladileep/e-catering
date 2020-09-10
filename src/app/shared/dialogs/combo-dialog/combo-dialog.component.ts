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
  public comboQuantityTotal;
  public packNames = [];
  public itemsList = [];
  public product; // coming from component reciepe component as intial value
  constructor(private cartService: CartService, private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.getComboItems(this.product.itemId);
  }

  /**
   * function : getComboItems
   * purpose  : this function used for list of combo items by passing product.itemId
   */

  public getComboItems(itemId): void {
    this.cartService.getCombo(itemId)
    .subscribe((data) => {
      this.comboData = data;
      this.comboData.ComboDetails.comboQty = 1;
      this.comboQuantityTotal = this.comboData.ComboDetails.comboQty;
      this.removeDuplicate();
      this.assignQuantity();
    });
  }

  /**
   * function : removeDuplicate
   * purpose  : this function used for ngFor to display the packageitems and menu items
   */

  public removeDuplicate(){
    let temp = new Map();
    let temp2 = [];
    for (let obj of this.comboData.ComboItems) {
      if(obj.packageId !== '0') {
      temp.set(obj.packName, obj);
      }
      if(obj.packageId === '0') {
      temp2.push(obj);
      }
    }
    this.packNames = [...temp.values()];
    this.itemsList = temp2;
  }

  /**
   * function : assignQuantity
   * purpose : if the selected item already in the cart we are assigning the quantity on load
   */
  public assignQuantity(){
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

  public changeItemsQuantity(e){
    this.comboQuantityTotal = +e.target.value;
    this.itemsList.forEach((x)=>{
      if(e.target.value > 0){
      $(`#${x.itemId}`).val(+x.itemQty * e.target.value);
      }
    });
  }

  public onSave(){
    this.comboData.ComboDetails.comboQty =  +$(`#comboqtyid`).val();
    this.comboData.ComboItems.forEach((x)=>{
      if(x.packageId !== '0'){
        x['itemQty'] = $(`#${x.itemId}`).val();
      }
      if(x.packageId === '0'){
        x['itemQty'] = $(`#${x.itemId}`).val();
      }
    });

    // classifying the selected items data into different arrays according to the packageName

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

    // validating the data onsubmit
    let result = [];
    itemsForValidation.forEach((x,i) => {
      x.forEach(item => {
        // if packtype one
        if(item.packType === "1"){
          if(item.filter(y => +y.itemQty > 0).length >= +item[0].minItems &&
          item.filter(y => +y.itemQty > 0).length <= +item[0].maxItems &&
          item.reduce((a, b) => +a + +b.itemQty, 0) <= +this.comboData.ComboDetails.comboQty
          ){
            result.push(true);
          }else{
            result.push(false);
          }
        }
        // if packtype not equal to one
        if(item.packType !== "1"){
          if(item.reduce((a, b) => +a + +b.itemQty, 0) <= +this.comboData.ComboDetails.comboQty){
            result.push(true);
          }else{
            result.push(false);
          }
        }

      });
    });

    if(result.includes(false)){
      console.log('err')
    }else {
      console.log('take order');
      this.takeOrder();
    }

  }



  public takeOrder(){
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
    this.modalRef.hide();
  }

}
