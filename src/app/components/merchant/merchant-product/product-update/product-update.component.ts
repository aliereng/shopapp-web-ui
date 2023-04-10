import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { Stock } from 'src/app/models/Stock';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  
  @Input() product!:Product;
  name!:String;
  visible!:Boolean;
  description!:String;
  stocks!:Array<Stock>;
  categories!:Array<Category>;
  image!:String;
  images!:Array<String>;

  constructor() { 
  }

  ngOnInit(): void {
   this.setAttributes();
  }
  setAttributes(){
    this.image=this.product.image;
    this.images=this.product.images;
    this.name = this.product.name;
    this.description = this.product.description;
    this.categories = this.product.categories;
    this.stocks = this.product.stocks;
    this.visible = this.product.visible;
  }
}
