import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url!: String;
  private httpOptions = {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
    }
  }
  constructor(private http: HttpClient) { 
    this.url = "http://localhost:3000/api/customer"
  }

  getCustomer():Observable<{data:Customer}>{
    return this.http.get<{data: Customer }>(this.url+"/",this.httpOptions)
  }
}
