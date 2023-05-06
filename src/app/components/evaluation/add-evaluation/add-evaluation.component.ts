import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from '../../../models/Comment';
@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss']
})
export class AddEvaluationComponent implements OnInit {
  @Input() productId!:String;
  @Input() stockId!:String;
  @Input() currentComment?:Comment;
  comment!:string;
  score:string = "default";
  constructor(private commentService:CommentService) {

  }
  saveComment(){
    this.commentService.addComment(this.productId.toString(), "Product", {comment:this.comment, score:this.score, stock:this.stockId}).subscribe(res=>{
      alert(res.success)
    },(err:HttpErrorResponse)=> {
      alert("yorum eklenemedi. " +err.error.message)
    })
  }
  updateComment(){
    this.commentService.updateComment(this.currentComment!._id!, {
      comment:this.currentComment!.comment,
      score:this.currentComment!.score
    }).subscribe(res=> {
      this.currentComment = res.data
      window.location.reload();
    },(err:HttpErrorResponse)=> {
      alert("güncelleme hatası: "+err.error.message)
    })
  }
  ngOnInit(): void {
  }
  
}
