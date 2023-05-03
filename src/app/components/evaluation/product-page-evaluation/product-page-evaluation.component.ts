import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from '../../../models/Comment';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationResponseModel } from 'src/app/models/PaginationResponseModel';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-page-evaluation',
  templateUrl: './product-page-evaluation.component.html',
  styleUrls: ['./product-page-evaluation.component.scss']
})
export class ProductPageEvaluationComponent implements OnInit {

  // @Input() comments!:Array<Comment>
  paginationComments!: PaginationResponseModel
  // comments!:Array<Comment>
  id!: String;
  limit: number = 10;
  date:string = "default"
  like:string = "default"
  sortBy!:string;
  query:string="";
  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot!.paramMap!.get("id")!;
    this.getComments();
  }

  ngOnInit(): void {
  }

  likeComment(id: string, like: number, i: number) {
    this.commentService.likeCommet(id, (like + 1)).subscribe((res) => {
      this.paginationComments.data[i].totalLikeCount = res.data.totalLikeCount
    }, (err: HttpErrorResponse) => {
      alert("like işlemi başarısız" + err.error.name)
    })
  }
  moreComment(){
    this.limit +=5
    this.getComments();
  }
  changeDate(event:any){
    this.sortBy = event.target.value
    this.getComments();
  }
  changeLike(event:any){
    this.sortBy = event.target.value
    this.getComments();
  }
  getComments(){
    this.commentService.getAllCommentsByProduct(this.id, this.limit.toString(), this.sortBy).subscribe(res => {
      this.paginationComments = res
      console.log(this.paginationComments)
    }, (err: HttpErrorResponse) => {
      alert("yorumlar getirilirken hatalarla karşılaşıldı. err: " + err.error.message)
    })
  }
}
