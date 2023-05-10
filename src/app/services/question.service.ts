import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Question} from '../models/Question'
import { PaginationResponseModel } from '../models/PaginationResponseModel';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private _url!:string;
  private _httpOptions!:Object;
  constructor(private http:HttpClient) {

    this._url = "http://localhost:3000/api/question/"
    this._httpOptions = {
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer: ${localStorage.getItem("access_token")}`
      }
    }
  }
  getQuestions(query:string):Observable<PaginationResponseModel<Question>>{
    return this.http.get<PaginationResponseModel<Question>>(this._url+`${query}`)
  }
  addQuestion(data:Object):Observable<{success:boolean, data:Question}>{
    return this.http.post<{success:boolean, data: Question}>(this._url+`add`,data, this._httpOptions)
  }
}
