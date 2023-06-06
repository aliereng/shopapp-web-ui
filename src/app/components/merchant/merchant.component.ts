import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
  notAnsweredQuestionCount!:number;
  constructor(private questionService:QuestionService, private alertifyService: AlertifyService) { 
    this.questionService.getNotAnsweredCount().subscribe(res=>{
      this.notAnsweredQuestionCount = res.data
    },()=>{
      this.alertifyService.warning("cevaplanmamış soru adedi getirilemedi.")
    })
  }

  ngOnInit(): void {
  }

}
