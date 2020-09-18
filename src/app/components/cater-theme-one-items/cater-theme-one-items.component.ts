import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';

@UntilDestroy()
@Component({
  selector: 'app-cater-theme-one-items',
  templateUrl: './cater-theme-one-items.component.html',
  styleUrls: ['./cater-theme-one-items.component.scss']
})
export class CaterThemeOneItemsComponent implements OnInit, DoCheck {

  public newMenu = [];
  public subSectionMenu = [];

  constructor(private cartService: CartService, private spinner: NgxSpinnerService) { }

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
      });
  }

  ngDoCheck(){
    this.cartService.subSectionId$.subscribe((res) => {
      this.subSectionMenu = this.newMenu.filter(x => x.subSectionId === res);
    });
  }


}
