import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url!: String;
  private httpOptions = {
    
      headers:{ 
        'Content-Type':  'application/json',
        'Authorization': `Bearer: ${localStorage.getItem("access_token")}`
      }
  }
  private result = {
    success: Boolean,
    data: Array<Address>
  }
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/api/address/"
  }

  getAddress(): Observable<{success: Boolean, data: Array<Address>}> {
    return this.http.get<{success: Boolean,data: Array<Address>}>(this.url + "getuser", this.httpOptions)
  }
  getAddressById(id:String): Observable<{success: Boolean, data: Address}> {
    return this.http.get<{success: Boolean,data: Address}>(this.url + `getaddress/:${id}`, this.httpOptions)
  }
  addAddress(address:Object):Observable<{success:Boolean, message:String}>{
    
    return this.http.post<{success:Boolean, message:String}>(this.url+"add",address, this.httpOptions)
  }
  updateAddress(address:{}, id:String):Observable<{success:Boolean}>{
    return this.http.put<{success:Boolean}>(this.url+`update\\${id}`,address,this.httpOptions)
  }
  removeAddress(id:String):Observable<{success:Boolean, message: String}>{
    return this.http.delete<{success:Boolean, message: String}>(this.url+`remove/${id}`,this.httpOptions)
  }

}

