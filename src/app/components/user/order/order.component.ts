import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { Order } from 'src/app/models/Order';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { v4 as uuidv4 } from 'uuid';

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
  productId!:String;
  customer!: Customer;
  stockId!:String;
  supplierId!:String;
  seeMoreStatus:Boolean = false;
  addEvaluationComponentStatus:Boolean= false;
  constructor(private service:OrderService, private customerService: CustomerService, private paymentService: PaymentService, private alertifyjs: AlertifyService) {
    this.service.getOrderByCustomer().subscribe(res=>{
      this.orders = res.data
    },(error:HttpErrorResponse)=>  {
      alert(error.error.message)
    })
    this.customerService.getCustomer().subscribe(response => {
      this.customer = response.data
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
  refundOrder(i: number){
    const data = {
      locale: navigator.language.toLowerCase(),
      conversationId: uuidv4(),
      paymentTransactionId: this.orders[i].paymentTransactionId,
      price: this.orders[i].amount.toString(),
      currency: navigator.language.toLowerCase(),
      ip: this.customer?.ip
    }
    this.paymentService.refund(data).subscribe(respose=> {
      this.alertifyjs.success("iade işlemleri başlatıldı.")
    },(err:HttpErrorResponse)=> {
      this.alertifyjs.error(err.message)
    })

  }
  ngOnInit(): void {
  }
  changeAddEvaAppStatusAndIds( product_id:String, stock_id:String, supplier_id:String){
    
    if(this.addEvaluationComponentStatus){
      this.addEvaluationComponentStatus = false;
      this.productId = "";
      this.stockId = "";
      this.supplierId = "";
    }else{
      this.addEvaluationComponentStatus = true;
      this.productId = product_id;
      this.stockId = stock_id;
      this.supplierId = supplier_id;
    }
  }

}
