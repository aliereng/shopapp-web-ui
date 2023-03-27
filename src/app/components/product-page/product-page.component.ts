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
  selectColor: String = "default-color";
  size: String = "default-size";
  sizes: Array<Stock> = []
  constructor(private service:ApiService, private activatedRoute:ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot!.paramMap!.get("id")!;
    this.slug = this.activatedRoute.snapshot!.paramMap!.get("slug")!;
    this.service.getProductById(this.slug,this.id).subscribe(prd=> {
      this.product = prd.data
    })
  }
  selectedColor(){
    this.sizes = [];
    this.size = "default-size"
    this.service.getStockFromProductByColor(this.id, this.selectColor).subscribe(res=> {
      if(Array.isArray(res.data)){
        res.data.map(stock => {
          this.sizes.push(stock)
        })
      }
    })
  }
  ngOnInit(): void {
  }

}
