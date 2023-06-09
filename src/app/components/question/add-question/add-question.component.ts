import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  product_id!:string;
  merchant_id!:string;
  askText!:string;
  constructor(private questionService:QuestionService, private activatedRoute:ActivatedRoute, private alertify:AlertifyService) {
    this.product_id = this.activatedRoute.snapshot!.paramMap!.get("id")!;
    this.merchant_id = this.activatedRoute.snapshot!.paramMap!.get("merchant_id")!;
    
  }

  ngOnInit(): void {
  }
  
  ask(){
    const questionBody = this.createObject();
    this.questionService.addQuestion(questionBody).subscribe(res=> {
      this.alertify.success("sorunuz eklendi.")
    },(err:HttpErrorResponse)=> {
      this.alertify.error(err.error.message)
    })
  }
  createObject():Object{
    return {
      title: this.askText,
      supplier: this.merchant_id,
      product: this.product_id
    }
  }

}
