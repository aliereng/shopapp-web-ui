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
  paginationComments!: PaginationResponseModel<Comment>
  // comments!:Array<Comment>
  id!: String;
  limit: number = 10;
  page: number = 1;
  date: string = "default"
  like: string = "default"
  sortBy!: string;
  query: string = "";
  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot!.paramMap!.get("id")!;
    this.query = `?page=${this.page}&limit=${this.limit}`
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
      this.query = this.query.slice(0, index);
      this.query += `&${value}=${data}`
    } else {
      this.query += `&${value}=${data}`
    }

  }
  setLimit(event: any) {
    this.setNewLimitOrSortBy("limit", event.target.value);
    this.getComments();
  }

  changeSelects(event: any) {
    this.setNewLimitOrSortBy("sortBy", event.target.value);
    this.getComments()
  }

  getComments() {
    this.commentService.getAllCommentsByProduct(this.id, this.query).subscribe(res => {
      this.paginationComments = res
    }, (err: HttpErrorResponse) => {
      alert("yorumlar getirilirken hatalarla karşılaşıldı. err: " + err.error.message)
    })
  }
}
