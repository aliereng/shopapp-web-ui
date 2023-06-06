import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginationResponseModel } from 'src/app/models/PaginationResponseModel';
import { Question } from 'src/app/models/Question';
import { AlertifyService } from 'src/app/services/alertify.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questions! : PaginationResponseModel<Question>
  query:string = "";
  limit:number = 10;
  page:number = 1;
  constructor(private questionService:QuestionService, private alertify: AlertifyService) { 
    this.query = `?answered=all&page=${this.page}&limit=${this.limit}`;
    this.getQuestions();
  }

  ngOnInit(): void {
  }
  removeQuestion(id:string){
    this.questionService.removeQuestion(id).subscribe(res=>{
      this.alertify.success("soru silindi.")
      window.location.reload();
    },()=> {
      this.alertify.error("soru silinemedi.")
    })
  }
  showAnswerArea(index:number, event:any){
    if(event.target.innerText == "Cevabı Göster"){
      document.getElementsByClassName("answerArea")[index].setAttribute("style","display:block")
      event.target.innerText = "Cevabı Gizle"
    }else{
      document.getElementsByClassName("answerArea")[index].setAttribute("style","display:none")
      event.target.innerText = "Cevabı Göster"
     

    }
  }
  getQuestions(){
    this.questionService.getQuestionsByCustomer(this.query).subscribe(res=> {
      this.questions = res;
    },(error:HttpErrorResponse)=>{
      if(error.error.message == "giriş yapın"){
        window.location.replace("/login");
      }else{
        this.alertify.error("sorular getirilemedi. hata: " +error.error.message)
      }
    })
  }

  // seeMoreComments(){
  //   this.limit +=5;
  //   this.query = `?limit=${this.limit}`;
  //   this.getQuestions();

  // }
  seeMore() {
    this.page += 1;
    this.setPageInQuery();
    this.getQuestions();
  }
  lessMore() {
    this.page -= 1;
    this.setPageInQuery();
    this.getQuestions();

  }
  setPageInQuery() {
    let pageIndex = this.query.indexOf("page");
    this.query = this.query.slice(0, pageIndex);
    this.query += `page=${this.page}&limit=${this.limit}`
  }
  setLimitInQuery(){
    
  }
  setNewLimitOrSortBy(value: string, data: any) {
    
    if (this.query.includes(value)) {
      let index = this.query.indexOf(value);
      let afterQuery= this.query.slice(0, index);
      let beforeQuery= this.query.slice(index+this.query.indexOf("&"), this.query.length);
      
      this.query = `${afterQuery}${value}=${data}&${beforeQuery}`
      // console.log(`after: ${afterQuery} - before: ${beforeQuery}\n${this.query}`)
    } else {
      this.query += `&${value}=${data}`
    }

  }
  setLimit(event: any) {
    this.setNewLimitOrSortBy("limit", event.target.value);
    this.getQuestions();
  }

  changeSelects(event: any) {
    switch (event.target.id) {
      case "answered":
        this.setNewLimitOrSortBy("answered",event.target.value)
        break;
      case "date":
        this.setNewLimitOrSortBy("sortBy", event.target.value);
        break;
      default:
        break;
    }
    this.getQuestions();
  }
}
