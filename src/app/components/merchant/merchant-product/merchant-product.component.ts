import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-merchant-product',
  templateUrl: './merchant-product.component.html',
  styleUrls: ['./merchant-product.component.scss']
})
export class MerchantProductComponent implements OnInit {
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.disableAreas()
    
  }
  products!: Array<Product>
  productInfoArea!: HTMLDivElement;
  productUpdateArea!: HTMLDivElement ;
  constructor(private service: ProductService) {
    this.service.getAllProductsByMerchant().subscribe(res => {
      this.products = res.data
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })
  }
  showProductInfo(productInfoArea:HTMLDivElement){
    productInfoArea.setAttribute("style","display:block");
    this.productInfoArea = productInfoArea
    this.productUpdateArea.setAttribute("style","display:none")

  }
  showUpdateArea(productUpdateArea:HTMLDivElement){
    productUpdateArea.setAttribute("style","display:block");
    this.productUpdateArea= productUpdateArea
    this.productInfoArea.setAttribute("style","display:none")

  }
  disableAreas(){
    if(this.productInfoArea){
      this.productInfoArea.setAttribute("style","display:none")
    }
    if(this.productUpdateArea){
      this.productUpdateArea.setAttribute("style","display:none")
    }
  }
  ngOnInit(): void {
  }

}
