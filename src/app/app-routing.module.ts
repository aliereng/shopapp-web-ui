import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetComponent } from './components/auth/reset/reset.component';
import { HomeComponent } from './components/home/home.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/cart/payment/payment.component';
import { UserComponent } from './components/user/user.component';
import { PageComponent } from './components/user/page/page.component';
import { OrderComponent } from './components/user/order/order.component';
import { AddressComponent } from './components/user/address/address.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:LoginComponent},
  {path:"product/:slug/:id", component:ProductPageComponent},
  {path:"category/:slug", component:ProductsComponent},
  {path:"resetpassword", component:ResetComponent},
  {path:"cart", component:CartComponent},
  {path:"cart/payment", component:PaymentComponent},
  {path:"user", component:UserComponent, children:[
    {path:"page", component:PageComponent},
    {path:"order", component:OrderComponent},
    {path:"address", component:AddressComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 