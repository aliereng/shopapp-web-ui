import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/models/Product';
import { Property } from 'src/app/models/Property';
import { AlertifyService } from 'src/app/services/alertify.service';

import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  id: string = "";
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
  constructor(private service:ApiService, private commentService: CommentService, private alertify:AlertifyService, private activatedRoute:ActivatedRoute, private router:Router) { 
    this.id = this.activatedRoute.snapshot!.paramMap!.get("id")!;
    this.slug = this.activatedRoute.snapshot!.paramMap!.get("slug")!;
    this.service.getProductById(this.slug,this.id).subscribe(prd=> {
      this.product = prd.data
      this.productPrice = prd.data.price;
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
          this.image = stock.image
          if(stock.images != null){
            this.images = stock.images
          }
        })
      }

    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
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
        this.alertify.success(result.message)
      },(error:HttpErrorResponse)=> {
        this.alertify.error(error.error.message)
      })

    }else{
      alert("lütfen renk ve boyut bilgisini seçiniz.")
    }
  }
  likeComment(id:string, like: number, i:number){
    this.commentService.likeCommet(id, (like+1)).subscribe((res)=> {
      this.product.comments[i].totalLikeCount = res.data.totalLikeCount
    },(err:HttpErrorResponse)=> {
      alert("like işlemi başarısız"+ err.error.message)
    })
  }
  ngOnInit(): void {
   
  }

}
