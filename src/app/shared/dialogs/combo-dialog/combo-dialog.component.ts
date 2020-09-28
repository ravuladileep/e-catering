import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ValidationAlertDialogComponent } from '../validation-alert-dialog/validation-alert-dialog.component';
declare var $: any;

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
  public showSummary = false;
  summaryData;
  public product; // coming from component reciepe component as intial value
  constructor(private cartService: CartService, private modalRef: BsModalRef, private modalService: BsModalService) { }

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

  closeModal(){
    this.modalRef.hide();
  }
  /**
   * function : removeDuplicate
   * purpose  : this function used for ngFor to display the packageitems and menu items
   */

  public removeDuplicate(){
    let temp = new Map();
    let temp2 = [];
    for (let obj of this.comboData.ComboItems) {
      if (obj.packageId !== '0') {
      temp.set(obj.packName, obj);
      }
      if (obj.packageId === '0') {
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
    if (this.cartService.cart.combo.length){
      this.cartService.cart.combo.find(
        ({ ComboDetails, ComboItems }) => {
          if (ComboDetails.comboId === this.comboData.ComboDetails.comboId) {
            this.comboData.ComboDetails = JSON.parse(JSON.stringify(ComboDetails)) ;
            this.comboData.ComboItems = JSON.parse(JSON.stringify(ComboItems));
            $(`#comboqtyid`).val(+this.comboData.ComboDetails.comboQty);
            this.comboQuantityTotal =  $(`#comboqtyid`).val();
            this.comboData.ComboItems.forEach((x) => {
              if (x.packageId !== '0'){
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
    this.itemsList.forEach((x) => {
      if (e.target.value > 0){
      $(`#${x.itemId}`).val(+x.itemQty * e.target.value);
      }
    });
  }

  public onConfirm(){
    this.showSummary = false;
    this.takeOrder();
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

    // when there is no package items in combo directly accepting order
    if(!this.comboData.ComboItems.filter(x => x.packageId !== '0').length){
      this.takeOrder();
    }else {
      // when combo contains package and list items also
    let temp = new Map();
    for (let obj of this.comboData.ComboItems.filter(x => x.itemQty > 0)) {
      if (obj.packageId !== '0') {
      temp.set(obj.packName, obj);
      }
    }
    this.summaryData = [...temp.values()];


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
    itemsForValidation.push(Object.values(group));
    console.log(itemsForValidation);

    // validating the data onsubmit
    let result = [];
    itemsForValidation.forEach((x, i) => {
      x.forEach(item => {
        // if packtype one
        if (item[0].packType === "1" &&  (item[0].maxItems && item[0].minItems)){
          if (item.filter(y => +y.itemQty > 0).length >= +item[0].minItems &&
          item.filter(y => +y.itemQty > 0).length <= +item[0].maxItems &&
          item.reduce((a, b) => +a + +b.itemQty, 0) == +this.comboData.ComboDetails.comboQty
          ){
            result.push(true);
          }else{
            this.modalService.show(ValidationAlertDialogComponent, {
              class: 'modal-dialog-custom ',
              initialState: { message : `For  Package- ${item[0].packName.bold()} <br> The Total item quantity should be  equal to  ${this.comboQuantityTotal}.` },
              keyboard: false,
            });
            result.push(false);
            // alert(`For  Package-${item[0].packName} \n The Total item quantity should be  equal to  ${this.comboQuantityTotal}.`)
          }
        }
        // if packtype not equal to one
        if (item[0].packType !== "1" || (!item[0].maxItems && !item[0].minItems)){
          if (item.reduce((a, b) => +a + +b.itemQty, 0) == +this.comboData.ComboDetails.comboQty){
            result.push(true);
          }else{
            this.modalService.show(ValidationAlertDialogComponent, {
              class: 'modal-dialog-custom ',
              initialState: { message : `For  Package- ${item[0].packName.bold()} <br> The Total item quantity should be equal to  ${this.comboQuantityTotal}.` },
              keyboard: false,
            });
            result.push(false);
            // alert(`For  Package-${item[0].packName} \n The Total item quantity should be equal to  ${this.comboQuantityTotal}.`)
          }
        }

      });
    });

    if (result.includes(false)){
      this.showSummary = false;
      console.log('err');
    }else {
      this.showSummary = true;
      // console.log('take order');
      // this.takeOrder();
    }

  }

  }




  public takeOrder(){

    this.cartService.cart.combo.forEach((x, i) => {
      if (this.comboData.ComboDetails.comboId === x.ComboDetails.comboId){
        this.cartService.cart.combo[i] = this.comboData;
      }
    });
    const productExistInCart = this.cartService.cart.combo.find(
      ({ ComboDetails }) => ComboDetails.comboId ===  this.comboData.ComboDetails.comboId);

    if (!productExistInCart){
      this.cartService.cart.combo.push(this.comboData);
    }
    this.modalRef.hide();
  }

}
