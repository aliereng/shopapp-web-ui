import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url!:string;
  constructor(private http:HttpClient) {

    this.url = "http://localhost:3000/api/categories/"

  }
  getAllCategory():Observable<{success:Boolean, data:[Category]}>{
    return this.http.get<{success:Boolean, data:[Category]}>(this.url);
  }
  getCategoryById(id:string):Observable<{success:Boolean, data:Category}>{
    return this.http.get<{success:Boolean, data:Category}>(this.url+id)
  }
}
