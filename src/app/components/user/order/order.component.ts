import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { Order } from 'src/app/models/Order';
import { Shipper } from 'src/app/models/Shipper';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CustomerService } from 'src/app/services/customer.service';
import { MerchantService } from 'src/app/services/merchant.service';
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
  // order!: Order;
  orders!: Array<Order>;
  productId!:String;
  customer!: Customer;
  currentDate!: Date;
  stockId!:String;
  supplierId!:String;
  seeMoreStatus:Boolean = false;
  addEvaluationComponentStatus:Boolean= false;
  returnReason!: String;
  shippers!: Array<Shipper>
  shipperChoice!: String;
  boxCount: String = "1";
  constructor(private service:OrderService, private customerService: CustomerService, private paymentService: PaymentService, private alertifyjs: AlertifyService, private merchantService: MerchantService) {
    this.currentDate = new Date();
    this.service.getOrderByCustomer().subscribe(res=>{
      this.orders = res.data
      console.log(this.orders)
      setTimeout(() => {
        this.orders.map(order=> {
          order.createdAt = new Date(order.createdAt)
        })
      }, 20);
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
  cancelOrder(i: number){
    const ids: Array<String> = [];
    const indexes: Array<number> = [];
    const paymentId = this.orders[i].paymentId;
    this.orders.map((order, index)=> {
      if(order.paymentId == paymentId){
        document.getElementsByClassName("order")[index].setAttribute("style", "background-color:red");
        ids.push(order._id);
        indexes.push(index);
      }
    })
    
    setTimeout(() => {
      const result = confirm("Aynı ödeme grubunda oldukları için rengi değişen ürünler iptal eilecektir. Devam etmek istiyor musunuz?")
      if(result){
        const data = {
          ids,
          info: {
            locale: navigator.language.toLowerCase(),
            conversationId: uuidv4(),
            paymentId: this.orders[i].paymentId,
            ip: this.customer.ip
          }
        }
        this.service.cancelOrder(data).subscribe(resp=> {
          this.alertifyjs.success("seçili ürünler iptal edildi.")
          location.reload();
        })
        // alert("çalıştı")
      }else{
        indexes.map(index => {
          document.getElementsByClassName("order")[index].setAttribute("style", "background-color:none");
        })
      }
    }, 10);
    
  
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
  apply(orderId: String){
    this.alertifyjs.warning(orderId);
  }
  refundPay(i: number){
    document.getElementById("refundOptions")?.setAttribute("style", "display:none");
    const data = {
      orderId: this.orders[i]._id,
      returnReason: this.returnReason,
      shipper: this.shipperChoice,
      boxCount: this.boxCount,
      ip: this.customer.ip,
      info: {
        locale: navigator.language.toLowerCase(),
        conversationId: uuidv4(),
        paymentTransactionId: this.orders[i].paymentTransactionId,
        price: this.orders[i].amount.toString(),
        currency: navigator.language.toLowerCase(),
        ip: this.customer?.ip
      }
    }
    // console.log(data)
    this.service.createReturn(data).subscribe(result => {
      if(result.success){
        this.alertifyjs.success("iade talebiniz oluşturuldu")
      }
    },((err:HttpErrorResponse)=> {
      this.alertifyjs.error("iade işlemi başarısız.")
    }))
  }

  openRefundOptions(i: number){
    document.getElementById("refundOptions")?.setAttribute("style", "display:flex");
    this.merchantService.getMerchantShippers(this.orders[i].supplier._id).subscribe(resp =>{
      this.shippers = resp.data;
    })
  }

}
