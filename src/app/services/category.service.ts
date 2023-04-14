import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url!:String;
  constructor() {

    this.url = "http://localhost:3000/api/category"

  }
}
