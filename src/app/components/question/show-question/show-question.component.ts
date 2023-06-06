import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationResponseModel } from 'src/app/models/PaginationResponseModel';
import { Question } from 'src/app/models/Question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss']
})
export class ShowQuestionComponent implements OnInit {
  questionResult!: PaginationResponseModel<Question>
  product_id!: string;
  merchant_id!: string;
  query!: string;
  limit: number = 10;
  page: number = 1;
  questionCount: number = 0;
  allQuestionShow: Boolean = false;
  questionPage: boolean = false;
  answerDuration!: Date;
  constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute) {
    this.product_id = this.activatedRoute.snapshot!.paramMap!.get("id")!;
    this.merchant_id = this.activatedRoute.snapshot!.paramMap!.get("merchant_id")!;
    if (this.merchant_id) {
      this.questionPage = true;

      // this.query = `product/${this.product_id}/merchant/${this.merchant_id}?all=false&limit=${this.limit}`
      this.query = `product/${this.product_id}/merchant/${this.merchant_id}?all=false&page=${this.page}&limit=10`
    } else {
      this.questionPage = false;
      // this.query = `product/${this.product_id}?limit=${this.limit}`
      this.query = `product/${this.product_id}?page=${this.page}&limit=10`

    }
    this.getQuestions();
  }

  ngOnInit(): void {
  }
  
  getQuestions() {
    this.questionService.getQuestions(this.query).subscribe(res => {
      this.questionResult = res;

    }, (err: HttpErrorResponse) => {
      alert("Sorular getirilirken hata: " + err.error.message)
    })
  }
  selectAllQuestions() {
    this.allQuestionShow = !this.allQuestionShow
    if (this.allQuestionShow) {
      // this.query = `product/${this.product_id}/merchant/${this.merchant_id}?all=true&limit=${this.limit}`
      this.query = `product/${this.product_id}/merchant/${this.merchant_id}?all=true&page=${this.page}&limit=${this.limit}`
    } else {
      // this.query = `product/${this.product_id}/merchant/${this.merchant_id}?all=false&limit=${this.limit}`
      this.query = `product/${this.product_id}/merchant/${this.merchant_id}?all=false&page=${this.page}`
    }
    this.getQuestions();
  }
  // seeMore(){
  //   this.limit += 5;
  //   let limitIndex = this.query.indexOf("limit");
  //   this.query = this.query.slice(0, limitIndex);
  //   this.query += `limit=${this.limit}`
  //   this.getQuestions();
  // }
  seeMore() {
    this.page += 1;
    let pageIndex = this.query.indexOf("page");
    this.query = this.query.slice(0, pageIndex);
    this.query += `page=${this.page}&limit=${this.limit}`
    console.log(this.query)
    this.getQuestions();
  }
  setLimit(event:any){
    
    this.limit = event.target.value;
    if(this.query.includes("limit")){
      let limitIndex = this.query.indexOf("limit");
      this.query = this.query.slice(0, limitIndex);
      this.query += `&limit=${this.limit}`
    }else{
      this.query += `&limit=${this.limit}`
    }
    
    console.log(this.query)
    this.getQuestions();
  }
  lessMore(){
    this.page -= 1;
    let pageIndex = this.query.indexOf("page");
    this.query = this.query.slice(0, pageIndex);
    this.query += `page=${this.page}&limit=${this.limit}`
    console.log(this.query)
    this.getQuestions();
  }
  likeQuestion(id: string, likeCount: number, index: number) {
    const newLikeCount = likeCount + 1;
    this.questionService.likeQuestion(id, newLikeCount).subscribe(res => { }, (err: HttpErrorResponse) => {
      alert(err.error.message)
    }

    )
    this.questionResult.data[index].likeCount = newLikeCount;
  }

}
