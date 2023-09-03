import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/Cart';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  url!: String;
  private httpOptions = {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
    }
  }
  constructor(private http: HttpClient) { 
    this.url = "http://localhost:3000/api/cart/get"
  }

  getCart():Observable<{success: Boolean, data: Cart}>{
    return this.http.get<{success: Boolean, data: Cart}>(this.url +"/",this.httpOptions)
  }
}
