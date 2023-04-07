import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipper } from '../models/Shipper';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {
  private url!: String;
  private httpOptions = {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
    }
  }
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/api/shipper/"
  }

  getAll():Observable<{data:[Shipper]}>{
    return this.http.get<{data:[Shipper]}>(this.url+"",this.httpOptions)
  }
}
