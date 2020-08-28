import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-combo-item-dialog',
  templateUrl: './combo-item-dialog.component.html',
  styleUrls: ['./combo-item-dialog.component.scss']
})
export class ComboItemDialogComponent implements OnInit {
  public packageData;
  public product; // coming from component reciepe component as intial value
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getComboItems(this.product.itemId);
  }

  public getComboItems(itemId): void {
    this.cartService.getComboItems(itemId).pipe(untilDestroyed(this))
    .subscribe((data) => {
      console.log(data);
      this.packageData = data;
    });
  }

  public decreasePackageQty(){
    console.log(this.packageData.PackageDetails.PkgQty--);
  }

  public increasePackageQty(){
    console.log(this.packageData.PackageDetails.PkgQty++);
  }

  public decreaseItemQty(item){
    item.pkgItemQty--;
  }

  public increaseItemQty(item){
    item.pkgItemQty++;
  }

  onSave(): void {
  }

  calculateTotalQty(){
    // let total = [];
    // this.packageData.PackageItems.forEach((x)=>{

    // })
  }

}
