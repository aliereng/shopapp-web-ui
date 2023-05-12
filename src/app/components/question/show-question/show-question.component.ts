import { Component, Input, OnInit } from '@angular/core';
import { PaginationResponseModel } from 'src/app/models/PaginationResponseModel';
import { Question } from 'src/app/models/Question';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss']
})
export class ShowQuestionComponent implements OnInit {
  @Input() questionResult!:PaginationResponseModel<Question>
  constructor() { }

  ngOnInit(): void {
  }

}
