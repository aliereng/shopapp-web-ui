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
import { MerchantComponent } from './components/merchant/merchant.component';
import { TransactionComponent } from './components/merchant/transaction/transaction.component';
import { ShipperComponent } from './components/merchant/shipper/shipper.component';
import { AnswerComponent } from './components/merchant/answer/answer.component';
import { MerchantProductComponent } from './components/merchant/merchant-product/merchant-product.component';
import { AddProductComponent } from './components/merchant/merchant-product/add-product/add-product.component';
import { CustomerCommentComponent } from './components/user/customer-comment/customer-comment.component';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';
import { QuestionComponent } from './components/user/question/question.component';
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
    {path:"address", component:AddressComponent},
    {path:"comment", component:CustomerCommentComponent},
    {path:"question", component:QuestionComponent},


  ]},
  {path:"merchant", component:MerchantComponent, children:[
    {path:"transaction", component:TransactionComponent},
    {path:"page", component:PageComponent},
    {path:"product", component:MerchantProductComponent},
    {path:"product/add", component:AddProductComponent},
    {path:"shipper", component:ShipperComponent},
    {path:"answer", component:AnswerComponent},
    // {path:"comment", component:CommentComponent}

  ]},
  {path:"product/:slug/:id/askmerchant/:merchant_id", component:QuestionAnswerComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 