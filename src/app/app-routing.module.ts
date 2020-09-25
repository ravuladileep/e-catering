import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { MyOrdersListComponent } from './components/my-orders-list/my-orders-list.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { CaterThemeOneComponent } from './components/cater-theme-one/cater-theme-one.component';
import { TemplateGuard } from './shared/guards/template.guard';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'order-details', component: OrderDetailsComponent},
  {path: 'orders-list', component: MyOrdersListComponent},
  {path: 'place-order', component: PlaceOrderComponent},
  {path: 'order-confirmation', component: OrderConfirmationComponent},
  {path: 'cater-theme-one',  component: CaterThemeOneComponent},
  {path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
