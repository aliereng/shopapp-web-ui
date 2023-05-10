import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
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
  paginationResponse!:PaginationResponseModel<Question>
  constructor(private questionService:QuestionService) { 
    this.query = `product/${this.product_id}/merchant/${this.merchant_id}`
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
      console.log(res.data)
    },(err:HttpErrorResponse)=> {
      alert("Sorular getirilirken hata: "+ err.error.message)
    })
  }
}
