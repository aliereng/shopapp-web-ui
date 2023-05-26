import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/Question';
import { AlertifyService } from 'src/app/services/alertify.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questions! : Array<Question>
  query:string = "";
  constructor(private questionService:QuestionService, private alertify: AlertifyService) { 
    this.query = `?answered=all`;
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
      this.questions = res.data;
    },(error:HttpErrorResponse)=>{
      if(error.error.message == "giriş yapın"){
        window.location.replace("/login");
      }else{
        this.alertify.error("sorular getirilemedi. hata: " +error.error.message)
      }
    })
  }
  changeFilterItems(event:any){
    switch(event.target.id){
      case "answered":
        this.query = `?answered=${event.target.value}`
        break;
      case "date":
        this.query = `?answered=all&sortBy=${event.target.value}`
        break;
      default:
        break;
    }
    this.getQuestions();
  }
}
