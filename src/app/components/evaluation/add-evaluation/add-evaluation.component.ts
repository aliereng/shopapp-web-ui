import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss']
})
export class AddEvaluationComponent implements OnInit {
  @Input() productId!:String;
  comment!:string;
  point:string = "default";
  constructor(private commentService:CommentService) {

  }
  saveComment(){
    this.commentService.addComment(this.productId.toString(), "Product", {comment:this.comment, point:this.point}).subscribe(res=>{
      alert(res.success)
    },(err:HttpErrorResponse)=> {
      alert("yorum eklenemedi. " +err.error.message)
    })
  }
  ngOnInit(): void {
  }
  
}
