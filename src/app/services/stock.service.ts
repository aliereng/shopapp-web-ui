import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { Stock } from '../models/Stock';
@Injectable({
  providedIn: 'root'
})
export class StockService {
  url!:String;
  private httpOptions = {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`,
      
    }
    
  }
  constructor(private http:HttpClient) {
    this.url = "http://localhost:3000/api/stocks/"
  }

  // addImagesThisStock(id:String,data:FormData):Observable<any>{
  //   return this.http.put<any>(this.url+`add?stockId=${id}`,data,this.httpOptions)
  // }

  async addImagesThisStock(id:String,data:FormData){
    return await axios.put(
      this.url+`add?stockId=${id}`,
      data,
      {
        headers:{
          'Authorization': "Bearer: "+ `${localStorage.getItem("access_token")}`,
          "Content-Type":"multipart/form-data"
        }
      }
    )
  }
  updateStock(id:String, data:Object):Observable<{success:true, data:Stock}>{
    return this.http.put<{success:true, data:Stock}>(this.url+`update?stockId=${id}`,data,this.httpOptions)  
  }
}
