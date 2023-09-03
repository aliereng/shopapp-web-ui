import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url!: String;
  private httpOptions = {
    
      headers:{ 
        'Content-Type':  'application/json',
        'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
      }
  }
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/api/payment";
  }
  checkCreditCart(data: {}): Observable<{success: Boolean, data: any}> {
    return this.http.post<{success: Boolean,data: any}>(this.url + "/checkCreditCard", data, this.httpOptions)
  }
  pay(request: Object):Observable<{success: boolean, data: any}>{
    return this.http.post<{success: boolean, data: any}>(this.url + "/", request, this.httpOptions)
  }
  pay3D(request: Object):Observable<{success: boolean, data: any}>{
    return this.http.post<{success: boolean, data: any}>(this.url + "/threeD", request, this.httpOptions)
  }
  refund(data:Object):Observable<{success: boolean, data: any}>{
    return this.http.post<{success: boolean, data: any}>(this.url + "/refund", data, this.httpOptions)
  }
}
