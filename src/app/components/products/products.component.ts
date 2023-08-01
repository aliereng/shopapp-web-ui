import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/models/Category';
import { HomepageModel } from 'src/app/models/HomepageModel';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  slug: String = "";
  query: String = "";
  max: String = "";
  min: String = "";
  homepageModel: HomepageModel | undefined;
  sort: String = "onerilen";
  colors: Array<String> = []
  color: String = "hepsi";
  categories:any =[]
  constructor(private activatedRoute: ActivatedRoute, private service: ApiService, private router: Router) {
    this.slug = this.activatedRoute.snapshot!.paramMap!.get("slug")!;
    this.service.getAllProductsByCategory(this.slug, this.query).subscribe(res => {
      this.homepageModel = res
      res.data.map(product => {
        product.stocks.map(stock => {
          if (!this.colors.includes(stock.color)) {
            this.colors.push(stock.color)
          }
        })
        
      })
      this.categories.push(res.data[0]?.categories)

    })
    


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  selectRadioButton(label: HTMLElement) {
    const prices = label.innerHTML.split("-");
    prices[0] = prices[0].trim()
    prices[1] = prices[1].trim()
    prices[0] = prices[0].slice(0, prices[0].indexOf(" "));
    prices[1] = prices[1].slice(0, prices[1].indexOf(" "));
    this.min = prices[0]
    this.max = prices[1]
    const currentQuery = this.query
    this.query += `min=${this.min}&max=${this.max}`;
    this.service.getAllProductsByCategory(this.slug, this.query).subscribe(res => {
      this.homepageModel = res
    })
    this.query = currentQuery;
  }
  manualPriceControl() {
    const currentQuery = this.query;
    this.query += `min=${this.min}&max=${this.max}`;
    this.service.getAllProductsByCategory(this.slug, this.query).subscribe(res => {
      this.homepageModel = res
    })
    this.query = currentQuery;
  }
  selectOverallRanking() {
    const currentQuery = this.query;
    switch (this.sort) {
      case "tarihEski":
        this.query += "sortBy=oldest"
        break;
      case "tarihYeni":
        this.query += "sortBy=newest"
        break;
      case "fiyatDusuk":
        this.query += "sortBy=cheap"
        break;
      case "fiyatYuksek":
        this.query += "sortBy=expensive"
        break;
      default:
        break;
    }
    this.service.getAllProductsByCategory(this.slug, this.query).subscribe(res => {
      this.homepageModel = res
    })
    this.query = currentQuery

  }
  selectColor() {
    const currentQuery = this.query;
    if (this.color == "hepsi") {
      this.service.getAllProductsByCategory(this.slug, this.query).subscribe(res => {
        this.homepageModel = res
      })
    } else {
      this.query += `color=${this.color}`;
      this.service.getAllProductsByCategory(this.slug, this.query).subscribe(res => {
        this.homepageModel = res
      },((err:HttpErrorResponse)=> {
        alert(err.message)
      }))
    }

    this.query = currentQuery
  }
  ngOnInit(): void {

  }

}

