import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url!: String;
  private httpOptions = {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
    }
  }
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/api/products/"
  }
  getAllProductsByMerchant():Observable<{success:Boolean, data:Array<Product>}>{
    return this.http.get<{success:Boolean, data:Array<Product>}>(this.url+"merchant", this.httpOptions)
  }
}
