import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/models/Product';
import { Stock } from 'src/app/models/Stock';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  id: String = "";
  slug: String = "";
  product!: Product; 
  productColor!: String;
  productSize!: String;
  productPrice!: Number;
  selectColor: String = "default-color";
  size: String = "default-size";
  sizes: Array<String> = []
  colors: Array<String> = []
  constructor(private service:ApiService, private activatedRoute:ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot!.paramMap!.get("id")!;
    this.slug = this.activatedRoute.snapshot!.paramMap!.get("slug")!;
    this.service.getProductById(this.slug,this.id).subscribe(prd=> {
      this.product = prd.data
      this.productColor = prd.data.color;
      this.productSize = prd.data.size;
      this.productPrice = prd.data.price
      if(Array.isArray(prd.data.stocks)){
        prd.data.stocks.map(stock=> {
          if(!this.colors.includes(stock.color)){
            this.colors.push(stock.color)
          }
        })
      }
    })
  }
  selectedColor(){
    this.sizes = [];
    this.size = "default-size"
    this.service.getStockFromProductByColor(this.id, this.selectColor).subscribe(res=> {
      if(Array.isArray(res.data)){
        res.data.map(stock => {
          this.sizes.push(stock.size)
        })
      }
    })
    
    this.productColor = this.selectColor;
    this.productSize = "";
  }
  selectedSize(){
    this.productSize = this.size;
    this.service.getStockFromProductByColor(this.id, this.selectColor).subscribe(res=> {
      if(Array.isArray(res.data)){
        res.data.map(stock => {
          if(stock.size == this.productSize){
            this.productPrice = stock.price
          }
        })
      }
    })
  }
  ngOnInit(): void {
  }

}
