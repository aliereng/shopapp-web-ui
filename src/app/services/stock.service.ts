import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  url!:String;
  private httpOptions = {

    headers: {
      'Content-Type': 'file',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`,
    }
    
  }
  constructor(private http:HttpClient) {
    this.url = "http://localhost:3000/api/stocks/"
  }

  addImagesThisStock(id:String,data:FormData):Observable<any>{
    return this.http.put<any>(this.url+`add?stockId=${id}`,data,this.httpOptions)
  }
}
