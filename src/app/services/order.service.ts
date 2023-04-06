import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url!: String;
  private httpOptions = {
    
      headers:{ 
        'Content-Type':  'application/json',
        'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
      }
  }
  constructor(private http:HttpClient) {
    this.url = "http://localhost:3000/api/orders/"
  }

  getOrderByCustomer():Observable<{success:Boolean, data:[Order]}>{
    return this.http.get<{success:Boolean, data:[Order]}>(this.url+"user",this.httpOptions)
  }
}
