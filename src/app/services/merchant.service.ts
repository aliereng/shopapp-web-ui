import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/Transaction';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  url!: String;
  private httpOptions = {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
    }
  }
  
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/api/merchant/"
  }
  getAllTransactions(query:String):Observable<{success:Boolean, data:[Transaction]}>{
    return this.http.get<{success:Boolean, data:[Transaction]}>(this.url+`transaction${query}`, this.httpOptions)
  }
  updateTransaction(data:Object):Observable<{success:Boolean}>{
    return this.http.put<{success:Boolean}>(this.url+"transaction/update",data,this.httpOptions);
  }
}
