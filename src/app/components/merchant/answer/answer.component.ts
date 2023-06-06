import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginationResponseModel } from 'src/app/models/PaginationResponseModel';
import { Question } from 'src/app/models/Question';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  questions!: PaginationResponseModel<Question>
  query: string = "";
  answerText!:string;
  limit:number = 10
  page:number=1
  updateAnswerText!:string;
  constructor(private questionService: QuestionService, private answerService: AnswerService, private alertyifyService: AlertifyService) {
    this.query = `answered=all&page=${this.page}&limit=${this.limit}`;
    this.getQuestions();
  }

  ngOnInit(): void {
  }
  addAnswer(id:string, i:number){
    const data = document.getElementsByTagName("textarea")[i].value;
    console.log(data);
    console.log(id)
    this.answerService.addAnswer({title:data, question:id}).subscribe(res=> {
      this.alertyifyService.success("cevap eklendi.")

    },(error:HttpErrorResponse)=> {
      this.alertyifyService.error("cevap eklenemedi: "+ error.error.message)

    })

  }
  updateAnswer(id:string){
    this.answerService.updateAnswer(id, {title:this.updateAnswerText}).subscribe(res=> {
      this.alertyifyService.success("cevap güncellendi");
      window.location.reload();
    },()=> {
      this.alertyifyService.error("cevap güncellenemedi.")
    })
  }
  deleteAnswer(id:string){
    this.answerService.removeAnswer(id).subscribe(res=> {
      this.alertyifyService.success("silme işlemi başarılı");
      window.location.reload();
    },()=> {
      this.alertyifyService.error("silinemedi")
    })
  }
 
  
  showAnswerArea(index: number, event: any) {
    if (event.target.innerText == "Cevabı Göster" || event.target.innerText == "Cevapla") {
      document.getElementsByClassName("addAnswer")[index].setAttribute("style", "display:block")
      event.target.innerText = "Cevabı Gizle"
      console.log(event)
    } else {
      document.getElementsByClassName("addAnswer")[index].setAttribute("style", "display:none")
      event.target.innerText = "Cevabı Göster"


    }
  }
  
  getQuestions() {
    this.questionService.getQuestionsByMerchant(this.query).subscribe(res => {
      this.questions = res;
    }, (error: HttpErrorResponse) => {
      if (error.error.message == "giriş yapın") {
        window.location.replace("/login");
      } else {
        alert("sorular getirilemedi. hata: " + error.error.message)
      }
    })
  }
  changeFilterItems(event:any){
    switch(event.target.id){
      case "answered":
        this.setQueryItems("answered", event.target.value)
        break;
      case "date":
        this.setQueryItems("sortBy", event.target.value)
        break;
      default:
        break;
    }
    this.getQuestions();
  }
  seeMore() {
    this.page += 1;
    this.setQueryItems("page", this.page);
    this.getQuestions();
  }
  lessMore() {
    this.page -= 1;
    this.setQueryItems("page", this.page);
    this.getQuestions();

  }

  setQueryItems(value: string, data: any) {
    
    if (this.query.includes(value)) {
      let queryParams = this.query.split("&");
      queryParams.map((param, index)=> {
        if(param.includes(value)){
          queryParams[index] = `${value}=${data}`;
        }
      })
      this.query = queryParams.join("&")
      
    } else {
      this.query += `&${value}=${data}`
    }

  }
  setLimit(event: any) {
    this.setQueryItems("limit", event.target.value);
    this.getQuestions();
  }

}
