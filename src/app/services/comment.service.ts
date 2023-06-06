import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from "../models/Comment"
import { Observable } from 'rxjs';
import { PaginationResponseModel } from '../models/PaginationResponseModel';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private _url!: string;
  private _httpOption = {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
    }
  }

  constructor(private http: HttpClient) {
    this._url = "http://localhost:3000/api/comments/"
  }
  addComment(id: string, type: string, data: {}): Observable<{ success: boolean, data: Comment }> {
    return this.http.post<{ success: boolean, data: Comment }>(this._url + `add/${id}?type=${type}`, data, this._httpOption)
  }

  // getAllCommentsByProduct(id:String,limit:String,sortBy:string):Observable<PaginationResponseModel<Comment>>{
  //   return this.http.get<PaginationResponseModel<Comment>>(this._url+id+`?limit=${limit}&sortBy=${sortBy}`);
  // }
  getAllCommentsByProduct(id:String,query:String):Observable<PaginationResponseModel<Comment>>{
    return this.http.get<PaginationResponseModel<Comment>>(this._url+id+`?${query}`);
  }
  likeCommet(id: string, like: number): Observable<{ success: Boolean, data: Comment }> {
    return this.http.put<{ success: Boolean, data: Comment }>(this._url + `like/${id}?like=${like}`, {}, this._httpOption)
  }
  getAllCommentsByCustomer(query:string):Observable<PaginationResponseModel<Comment>>{
    return this.http.get<PaginationResponseModel<Comment>>(this._url + `customer?${query}`,this._httpOption)
  }
  updateComment(id:string, data:Object):Observable<{success:boolean, data:Comment}>{
    return this.http.put<{success:boolean, data:Comment}>(this._url+`update/${id}`,data,this._httpOption)
  }
  delete(id:string):Observable<{success:boolean}>{
    return this.http.delete<{success:boolean}>(this._url+`delete/${id}`,this._httpOption)
  }
  
}

