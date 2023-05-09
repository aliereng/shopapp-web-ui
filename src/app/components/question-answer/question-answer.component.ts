import { Component, HostListener, OnInit } from '@angular/core';

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

  constructor() { 
    

  }

  ngOnInit(): void {
  }

  showAddAnswer(){
    this.addAnswerAreaStatus = true;
  }
}
