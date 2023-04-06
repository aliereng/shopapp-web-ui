import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/models/Product';
import { Property } from 'src/app/models/Property';
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
  stockId!: String;
  productColor!: String;
  productSize!: String;
  productPrice!: Number;
  selectColor: String = "default-color";
  size: String = "default-size";
  sizes: Array<String> = []
  colors: Array<String> = []
  images: Array<String> = []
  image!: String;
  someProducts: Array<Product> = [];
  props: Array<Property> = [];
  piece!: String;
  constructor(private service:ApiService, private activatedRoute:ActivatedRoute, private router:Router) { 
    this.id = this.activatedRoute.snapshot!.paramMap!.get("id")!;
    this.slug = this.activatedRoute.snapshot!.paramMap!.get("slug")!;
    this.service.getProductById(this.slug,this.id).subscribe(prd=> {
      this.product = prd.data
      // this.productColor = prd.data.color;
      // this.productSize = prd.data.size;
      this.productPrice = prd.data.price;
      // this.selectColor = prd.data.color;
      this.images = prd.data.images;
      this.image = prd.data.image
      if(Array.isArray(prd.data.stocks)){
        prd.data.stocks.map(stock=> {
          if(!this.colors.includes(stock.color)){
            this.colors.push(stock.color)
          }
          
        })
      }
      if(Array.isArray(prd.data.categories)){
        prd.data.categories.map(category=> {
          if(category != null){
            this.props = category.properties
          }
          // console.log(category)
        })
      }
      this.service.getAllProductsByCategory(this.product!.categories[this.product!.categories.length-1].slug,"").subscribe(result=> {
        this.someProducts = result.data
      })
    })
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
       
  }
  selectedColor(){
    this.sizes = [];
    this.size = "default-size"
    this.service.getStockFromProductByColor(this.id, this.selectColor).subscribe(res=> {
      if(Array.isArray(res.data)){
        res.data.map(stock => {
          this.sizes.push(stock.size)
          this.productSize = stock.size;
          // this.piece = "seçilen ürünün stok adedi: "+stock.piece
          if(stock.images != null){
            this.images = stock.images
          }
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
            this.piece = "seçilen ürünün stok adedi: "+stock.piece;
            this.stockId = stock._id;
            // this.productColor = this.product.color;
            // this.productSize = this.product.size;
          }
        })
      }
    })
  }
  clickSubImage(event: any){
    this.image= event.alt
  }
  addToCart(){
    if(this.id && this.stockId){
      // alert(this.id +" "+ this.stockId)
      this.service.addToCart({
        product: this.id,
        stock: this.stockId,
        count: "1"
      }).subscribe(result=> {
        alert(result.message);
      },(error:HttpErrorResponse)=> {
        alert(error.error.message)
        // window.location.replace("/login");
      })

    }else{
      alert("lütfen renk ve boyut bilgisini seçiniz.")
    }
  }
  ngOnInit(): void {
  }

}
