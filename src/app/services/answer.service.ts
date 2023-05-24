import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/Answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private _url!: string;
  constructor(private http: HttpClient) { 
    this._url = "http://localhost:3000/api/answer/"
  }

  addAnswer(data:object):Observable<{success:boolean, data:Answer}>{
    return this.http.post<{success:boolean, data:Answer}>(this._url+"add", data)
  }

}
