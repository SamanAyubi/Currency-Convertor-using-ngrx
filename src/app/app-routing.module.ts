import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisclaimerPageComponent } from "../app/disclaimer-page/disclaimer-page.component";
import { AppComponent } from "../app/app.component";
import { MainComponentComponent } from '../app/main-component/main-component.component';
import {GLOBAL_CONST } from '../app/global-constants';





const routes: Routes =[
  {
    path: '',
    component: MainComponentComponent
  },
  {
    path: GLOBAL_CONST.ROUTE_PARAMS.HOME,
    component: AppComponent
  },
  {
    path: GLOBAL_CONST.ROUTE_PARAMS.DISCLAIMER,
    component: DisclaimerPageComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

