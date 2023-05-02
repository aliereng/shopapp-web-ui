import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from '../../../models/Comment';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-product-page-evaluation',
  templateUrl: './product-page-evaluation.component.html',
  styleUrls: ['./product-page-evaluation.component.scss']
})
export class ProductPageEvaluationComponent implements OnInit {

  @Input() comments!:Array<Comment>
  constructor(private commentService:CommentService) { }

  ngOnInit(): void {
  }

  likeComment(id:string, like: number, i:number){
    this.commentService.likeCommet(id, (like+1)).subscribe((res)=> {
      this.comments[i].totalLikeCount = res.data.totalLikeCount
    },(err:HttpErrorResponse)=> {
      alert("like işlemi başarısız"+ err.error.name)
    })
  }

}
