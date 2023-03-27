import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  id: String = "";
  slug: String = "";
  product!: Product; 
  constructor(private service:ApiService, private activatedRoute:ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot!.paramMap!.get("id")!;
    this.slug = this.activatedRoute.snapshot!.paramMap!.get("slug")!;
    this.service.getProductById(this.slug,this.id).subscribe(prd=> {
      this.product = prd.data
    })
  }

  ngOnInit(): void {
  }

}
