import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart!: Cart
  constructor(private service: ApiService) {
    this.service.getCart().subscribe(res=> {
      this.cart = res.data
      console.log(res.data)
    },(error:HttpErrorResponse) =>{
      localStorage.setItem("access_token","");
      localStorage.setItem("user","");
      window.location.replace("/login");
      // alert(error.error.message)

    })
   }

  ngOnInit(): void {
  }

}
