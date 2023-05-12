import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationResponseModel } from 'src/app/models/PaginationResponseModel';
import { Question } from 'src/app/models/Question';
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
  product_id!: string;
  merchant_id!: string;
  query!: string;
  allQuestionShow: Boolean=false;
  paginationResponse!:PaginationResponseModel<Question>
  constructor(private questionService:QuestionService, private activatedRoute:ActivatedRoute) { 
    this.product_id = this.activatedRoute.snapshot!.paramMap!.get("product_id")!;
    this.merchant_id = this.activatedRoute.snapshot!.paramMap!.get("merchant_id")!;

    this.query = `product/${this.product_id}/merchant/${this.merchant_id}?all=false&limit=1`
    this.getQuestions();
  }

  ngOnInit(): void {
  }

  showAddAnswer(){
    this.addAnswerAreaStatus = true;
  }
  getQuestions(){
    this.questionService.getQuestions(this.query).subscribe(res=> {
      this.paginationResponse = res
    },(err:HttpErrorResponse)=> {
      alert("Sorular getirilirken hata: "+ err.error.message)
    })
  }
  selectAllQuestions(){
    this.allQuestionShow = !this.allQuestionShow
    if(this.allQuestionShow){
      this.query = `product/${this.product_id}/merchant/${this.merchant_id}?all=true&limit=1`
    }else{
      this.query = `product/${this.product_id}/merchant/${this.merchant_id}?all=false&limit=1`
    }
    this.getQuestions();
  }
}
