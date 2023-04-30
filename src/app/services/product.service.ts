import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url!: string;
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
  updateProductById(product:Product):Observable<{data:Product}>{
    return this.http.put<{data:Product}>(this.url+`${product._id}/update`,product, this.httpOptions)
  }
  createProduct(data:Object):Observable<{success:Boolean, data:Product}>{
    return this.http.post<{success:Boolean, data:Product}>(this.url+"add", data, this.httpOptions)
  }
  removeProduct(id:string):Observable<{message:string}>{
    return this.http.delete<{message:string}>(this.url+`${id}/delete`, this.httpOptions)
  }
}
