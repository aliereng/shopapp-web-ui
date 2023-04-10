import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './components/header/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ResetComponent } from './components/auth/reset/reset.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/cart/payment/payment.component';
import { UserComponent } from './components/user/user.component';
import { PageComponent } from './components/user/page/page.component';
import { OrderComponent } from './components/user/order/order.component';
import { AddressComponent } from './components/user/address/address.component';
import { AddAddressComponent } from './components/user/address/add-address/add-address.component';
import { UpdateAddressComponent } from './components/user/address/update-address/update-address.component';
import { MerchantComponent } from './components/merchant/merchant.component';
import { ShipperComponent } from './components/merchant/shipper/shipper.component';
import { AnswerComponent } from './components/merchant/answer/answer.component';
import { CommentComponent } from './components/merchant/comment/comment.component';
import { QuestionComponent } from './components/user/question/question.component';
import { TransactionComponent } from './components/merchant/transaction/transaction.component';
import { MerchantProductComponent } from './components/merchant/merchant-product/merchant-product.component';
import { ProductInfoComponent } from './components/merchant/merchant-product/product-info/product-info.component';
import { ProductUpdateComponent } from './components/merchant/merchant-product/product-update/product-update.component';
import { ProductStockUpdateComponent } from './components/merchant/merchant-product/product-update/product-stock-update/product-stock-update.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    CategoryComponent,
    ProductComponent,
    ProductsComponent,
    ProductPageComponent,
    ResetComponent,
    CartComponent,
    PaymentComponent,
    UserComponent,
    PageComponent,
    OrderComponent,
    AddressComponent,
    AddAddressComponent,
    UpdateAddressComponent,
    MerchantComponent,
    ShipperComponent,
    AnswerComponent,
    CommentComponent,
    QuestionComponent,
    TransactionComponent,
    MerchantProductComponent,
    ProductInfoComponent,
    ProductUpdateComponent,
    ProductStockUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
