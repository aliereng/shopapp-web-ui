import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders!: Array<Order>
  seeMoreStatus:Boolean = false;
  constructor(private service:OrderService) {
    this.service.getOrderByCustomer().subscribe(res=>{
      this.orders = res.data
    },(error:HttpErrorResponse)=>  {
      alert(error.error.message)
    })
  }
  showOrderDownArea(i:number){
    if(this.seeMoreStatus){
      document.getElementsByClassName("orderDownArea")[i].setAttribute("style","display:flex");
      document.getElementsByClassName("seeMore")[i].innerHTML = "daha az -";
      this.seeMoreStatus = false
    }else{
      document.getElementsByClassName("orderDownArea")[i].setAttribute("style","display:none");
      document.getElementsByClassName("seeMore")[i].innerHTML = "daha fazla +";
      this.seeMoreStatus = true
    }

  }
  ngOnInit(): void {
  }

}
