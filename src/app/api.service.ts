import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './models/Login';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:String =""
  constructor(private http: HttpClient) { 
    this.url = "http://localhost:3000/api/"
  }

  login(data:Object):Observable<Login> {
    return this.http.post<Login>(this.url+"customer/login", data)
  }
  
}
