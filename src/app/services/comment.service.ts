import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from "../models/Comment"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private _url!:string;
  private _httpOption ={
    
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
    }
  }
  constructor(private http:HttpClient) {
    this._url = "http://localhost:3000/api/comments/"
  }
  addComment(id:string, type:string, data:{}):Observable<{success:boolean, data:Comment}>{
    return this.http.post<{success:boolean, data:Comment}>(this._url+`add/${id}?type=${type}`,data,this._httpOption)
  }
  getAllCommentsByProduct(id: string):Observable<{success:boolean, data: Array<Comment>}>{
    return this.http.get<{success:boolean, data: Array<Comment>}>(this._url+id);
  }
  likeCommet(id:string, like:number):Observable<{success:Boolean, data:Comment}>{
    return this.http.put<{success:Boolean, data: Comment}>(this._url+`like/${id}?like=${like}`,{},this._httpOption)
  }
}
