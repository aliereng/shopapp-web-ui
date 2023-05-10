import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { PaginationResponseModel } from 'src/app/models/PaginationResponseModel';
import { CommentService } from 'src/app/services/comment.service';
import {Comment} from "../../../models/Comment"
@Component({
  selector: 'app-customer-comment',
  templateUrl: './customer-comment.component.html',
  styleUrls: ['./customer-comment.component.scss']
})
export class CustomerCommentComponent implements OnInit {
  paginationResp!: PaginationResponseModel<Comment>
  limit:number=10;
  query:string="";
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    for (let index = 0; index < document.getElementsByTagName("app-add-evaluation").length; index++) {
      document.getElementsByTagName("app-add-evaluation")[index].setAttribute("style", "display:none");
      
    }
  }
  constructor(private commentService:CommentService) {
    this.query = `?limit=1`
    this.getComments()
    
  }
  ngOnInit(): void {
  }
 
  getComments(){
    this.commentService.getAllCommentsByCustomer(this.query).subscribe(res=> {
      this.paginationResp = res
    },(err:HttpErrorResponse)=> {
      alert("yorumlar getirilirken hatalarla karşılaşıldı. " + err.error.message)
    })
  }
  changeFilterItems(event:any){
   
    switch (event.target.id) {
      case "type":
        this.query += `&type=${event.target.value}`
        break;
      case "date":
        this.query += `&sortBy=${event.target.value}`
        break;
      case "like":
        this.query += `&sortBy=${event.target.value}`
        break;
      default:
        break;
    }
    this.getComments();
    this.query = "?limit=10";
  }
  seeMoreComments(){
    this.limit +=5;
    this.query = `?limit=${this.limit}`;
    this.getComments();

  }

}
