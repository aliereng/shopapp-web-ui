import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
   this.addEvaluationComponentStatus = this.addEvaluationComponentStatus? false:true
  }
  orders!: Array<Order>
  seeMoreStatus:Boolean = false;
  addEvaluationComponentStatus:Boolean= false;
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
  changeAddEvaAppStatus(){
    if(this.addEvaluationComponentStatus){
      this.addEvaluationComponentStatus = false;
    }else{
      this.addEvaluationComponentStatus = true;
    }
  }

}
