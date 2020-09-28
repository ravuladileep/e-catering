import { DoCheck, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
declare var $:any;
@UntilDestroy()
@Component({
  selector: 'app-cater-theme-one-header',
  templateUrl: './cater-theme-one-header.component.html',
  styleUrls: ['./cater-theme-one-header.component.scss'],
})
export class CaterThemeOneHeaderComponent implements OnInit {
  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;
  public newMenu = [];
  public category = [];
  public subCategory = [];
  public p = 1;
  constructor(private cartService: CartService,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getItems();
    // this.dropdownMenu();
  }

  // ngDoCheck(){
  //   this.dropdownMenu();
  // }

  // public dropdownMenu(){
  //     $('.dropdown').on('mouseenter', function() {
  //       var $btnDropDown = $(this).find('.dropdown-toggle');
  //       var $listHolder = $(this).find('.dropdown-menu');
  //       // reset position property for DD container
  //       $(this).css('position', 'static');
  //       $listHolder.css({
  //         // "top": ($btnDropDown.offset().top + $btnDropDown.outerHeight(true)) + "px",
  //         'left': $btnDropDown.offset().left + 'px'
  //       });
  //       $listHolder.data('open', true);
  //     });
  //     // add BT DD hide event
  //     $('.dropdown').on('mouseleave', function() {
  //       var $listHolder = $(this).find('.dropdown-menu');
  //       $(this).css('position', '');
  //       $listHolder.css({
  //         "top": '',
  //         'left': ''
  //       });
  //       $listHolder.data('open', false);
  //     });
  // }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  public getItems(): void {
    this.spinner.show();
    this.cartService
      .getItems()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          this.newMenu = res.itemsList;
          if (this.cartService.cart.menuItems.length) {
            // this.assignQuantity();
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
          this.spinner.hide();
        },
        () => {
          this.cartService.subSectionId$.next(this.subCategory[0].subSectionId);
          this.spinner.hide();
        }
      );
  }

  public loadSubsection(val){
    this.cartService.subSectionId$.next(val.subSectionId);
  }

  // public changeCount(event): void {
  //   this.p = 1;
  // }

}
