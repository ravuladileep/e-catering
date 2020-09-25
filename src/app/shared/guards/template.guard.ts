import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateGuard {
  // canActivate(){}
  // public templateData;

  // constructor(private orderService: OrderService,
  //             private router: Router){
  //               console.log('construct')
  //               this.gettemp();
  //             }

  //             gettemp(){
  //               this.orderService.getTemplate().toPromise().then(res => {
  //                 sessionStorage.setItem('templateValue', JSON.stringify(res));
  //             });

  // canActivate(): boolean {
  //     this.orderService.getTemplate().subscribe(res => {
  //       console.log(res)
  //       if (res.templatevalue === 1){
  //         // this.router.navigate(['cater-theme-one']);
  //         return true;
  //       }else {
  //         this.router.navigate(['cater-theme-one']);
  //         return false;
  //       }
  //     });

  // }
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
  //   if (JSON.parse(sessionStorage.getItem('templateValue')).templatevalue === 1){
  //     console.log('sdfghjkl;')
  //     this.router.navigate(['home']);
  //     return true;
  //   }else {
  //     // console.log('edd')
  //     this.router.navigate(['cater-theme-one']);
  //     return false;
  //   }
  // }
}
