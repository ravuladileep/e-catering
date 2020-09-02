import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CartService } from './services/cart.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComboItemDialogComponent } from './shared/dialogs/combo-item-dialog/combo-item-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { MyOrdersListComponent } from './components/my-orders-list/my-orders-list.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { AuthService } from './services/auth.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { CaterThemeOneComponent } from './components/cater-theme-one/cater-theme-one.component';
@NgModule({
  entryComponents: [
    ComboItemDialogComponent
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CategoriesComponent,
    RecipeComponent,
    CartItemsComponent,
    DashboardComponent,
    OrdersComponent,
    RegisterComponent,
    LoginComponent,
    ComboItemDialogComponent,
    OrderDetailsComponent,
    MyOrdersListComponent,
    PlaceOrderComponent,
    OrderConfirmationComponent,
    CaterThemeOneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    AppRoutingModule,
    RouterModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    NgxCaptchaModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    CartService,
    AuthService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
