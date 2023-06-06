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
  page:number = 1
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    for (let index = 0; index < document.getElementsByTagName("app-add-evaluation").length; index++) {
      document.getElementsByTagName("app-add-evaluation")[index].setAttribute("style", "display:none");
      
    }
  }
  constructor(private commentService:CommentService) {
    this.query = `?type=all&page=${this.page}&limit=${this.limit}`
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
  // changeFilterItems(event:any){
   
  //   switch (event.target.id) {
  //     case "type":
  //       this.query += `&type=${event.target.value}`
  //       break;
  //     case "date":
  //       this.query += `&sortBy=${event.target.value}`
  //       break;
  //     case "like":
  //       this.query += `&sortBy=${event.target.value}`
  //       break;
  //     default:
  //       break;
  //   }
  //   this.getComments();
  //   this.query = "?limit=10";
  // }
  seeMoreComments(){
    this.limit +=5;
    this.query = `?limit=${this.limit}`;
    this.getComments();

  }
  seeMore() {
    this.page += 1;
    this.setPageInQuery();
    this.getComments();
  }
  lessMore() {
    this.page -= 1;
    this.setPageInQuery();
    this.getComments();

  }
  setPageInQuery() {
    let pageIndex = this.query.indexOf("page");
    this.query = this.query.slice(0, pageIndex);
    this.query += `page=${this.page}&limit=${this.limit}`
  }
  setNewLimitOrSortBy(value: string, data: any) {
    if (this.query.includes(value)) {
      let index = this.query.indexOf(value);
      let afterQuery= this.query.slice(0, index);
      let beforeQuery= this.query.slice(index+this.query.indexOf("&"), this.query.length);
      
      this.query = `${afterQuery}${value}=${data}&${beforeQuery}`
      console.log(`after: ${afterQuery} - before: ${beforeQuery}\n${this.query}`)
    } else {
      this.query += `&${value}=${data}`
    }

  }
  setLimit(event: any) {
    this.setNewLimitOrSortBy("limit", event.target.value);
    this.getComments();
  }

  changeSelects(event: any) {
    switch (event.target.id) {
      case "type":
        this.setNewLimitOrSortBy("type",event.target.value)
        break;
      case "date":
        this.setNewLimitOrSortBy("sortBy", event.target.value);
        break;
      case "like":
        this.setNewLimitOrSortBy("sortBy", event.target.value);
        break;
      default:
        break;
    }
    this.getComments();
  }

}
