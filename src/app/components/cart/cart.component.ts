import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toArray } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart!: Cart;
  constructor(private service: ApiService, private router:Router) {
    this.service.getCart().subscribe((result:HttpResponse<any>)=> {
      this.cart = result.body.data
    },(error:HttpErrorResponse) =>{
      localStorage.setItem("access_token","");
      localStorage.setItem("user","");
      window.location.replace("/login");
      alert(error.error.message)

    })
   }
   countArttir(index:number){
    this.cart.items[index].count++;
    //  alert(this.cart.items[index].count * this.cart.items[index].price)
    this.cart.amount += this.cart.items[index].price 

   }
   countAzalt(index:number){
    this.cart.items[index].count--;
    this.cart.amount -= this.cart.items[index].price 

   }
   kaldir(index:number){
    this.cart.amount -= this.cart.items[index].count * this.cart.items[index].price;
    this.cart.items.splice(index,1);
    document.getElementsByClassName("item")[index].innerHTML = "";
    document.getElementsByClassName("item")[index].setAttribute("style","border-bottom:none");
    this.applyCart();
   }
   applyCart(){
    console.log(this.cart)
    this.service.applyCart(this.cart._id, this.cart).subscribe(res=> {
    },(error:HttpErrorResponse) =>{
      alert(error.error.message)
      }
    );
   }

  ngOnInit(): void {
  }

}
