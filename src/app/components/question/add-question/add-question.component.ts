import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  product_id!:string;
  merchant_id!:string;
  constructor(private activatedRoute:ActivatedRoute) {
    this.product_id = this.activatedRoute.snapshot!.paramMap!.get("product_id")!;
    this.merchant_id = this.activatedRoute.snapshot!.paramMap!.get("merchant_id")!;
    
    alert(this.product_id + " / "+ this.merchant_id)
  }

  ngOnInit(): void {
  }

}
