import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationResponseModel } from 'src/app/models/PaginationResponseModel';
import { Product } from 'src/app/models/Product';
import { Question } from 'src/app/models/Question';
import { ProductService } from 'src/app/services/product.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})

export class QuestionAnswerComponent implements OnInit {
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent){
    this.addAnswerAreaStatus = false
  }
  addAnswerAreaStatus:boolean = false;
  product_id! : string;
  slug! : string;
  product!:Product;
  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute) { 
    this.product_id = this.activatedRoute.snapshot!.paramMap!.get("id")!;
    this.slug = this.activatedRoute.snapshot!.paramMap!.get("slug")!;
    this.productService.getProductById(`${this.slug}/${this.product_id}`).subscribe(res=> {
      this.product = res.data
    },(err:HttpErrorResponse)=> {
      alert("product getirilirken hata: "+err.error.message)
    })
  }

  ngOnInit(): void {
  }

  showAddAnswer(){
    this.addAnswerAreaStatus = true;
  }
  
  
}
