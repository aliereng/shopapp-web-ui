import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { PaginationResponseModel } from 'src/app/models/PaginationResponseModel';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-customer-comment',
  templateUrl: './customer-comment.component.html',
  styleUrls: ['./customer-comment.component.scss']
})
export class CustomerCommentComponent implements OnInit {
  paginationResp!: PaginationResponseModel
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    for (let index = 0; index < document.getElementsByTagName("app-add-evaluation").length; index++) {
      document.getElementsByTagName("app-add-evaluation")[index].setAttribute("style", "display:none");
      
    }
  }
  constructor(private commentService:CommentService) {
    this.getComments()
    
  }
  ngOnInit(): void {
  }
 
  getComments(){
    this.commentService.getAllCommentsByCustomer("10","newest").subscribe(res=> {
      this.paginationResp = res
    },(err:HttpErrorResponse)=> {
      alert("yorumlar getirilirken hatalarla karşılaşıldı. " + err.error.message)
    })
  }

}
