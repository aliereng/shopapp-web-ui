import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PaginationResponseModel } from 'src/app/models/PaginationResponseModel';
import { CommentService } from 'src/app/services/comment.service';
import {Comment} from "../../../models/Comment"
@Component({
  selector: 'app-customer-page-evaluation',
  templateUrl: './customer-page-evaluation.component.html',
  styleUrls: ['./customer-page-evaluation.component.scss']
})
export class CustomerPageEvaluationComponent implements OnInit {
  @Input() customerPagePag!: PaginationResponseModel<Comment>
  constructor(private commentSerivce:CommentService) { }

  ngOnInit(): void {
  }
  visibleUpdateArea(index:number){
    document.getElementsByTagName("app-add-evaluation")[index].setAttribute("style","display:block")
  }
  deleteComment(id:string){
    this.commentSerivce.delete(id).subscribe(res=> {
      alert("silme işlemi başarılı");
      window.location.reload()
    },(err:HttpErrorResponse)=> {
      alert("silme işlemi sırasında hata: "+ err.error.message)
    })
  }

}
