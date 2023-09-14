import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Shipper } from 'src/app/models/Shipper';
import { Transaction } from 'src/app/models/Transaction';
import { AlertifyService } from 'src/app/services/alertify.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { OrderService } from 'src/app/services/order.service';
import { ShipperService } from 'src/app/services/shipper.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions!: [Transaction]
  shippers!: [Shipper]
  sortByDate = "default";
  completeStatus = "all";
  query = "?";
  constructor(private service: MerchantService, private shipperService: ShipperService, private orderService: OrderService, private alertifyService: AlertifyService) { 
    this.service.getAllTransactions(this.query).subscribe(res=> {
      this.transactions = res.data
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })
    this.shipperService.getAll().subscribe(res=> {
      this.shippers = res.data;
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })

  }
  applyChanges(transactionId: String, orderStatus:HTMLSelectElement, shippedStatus:HTMLSelectElement, selectShipper:HTMLSelectElement,followCode:HTMLInputElement ){
    
    this.service.updateTransaction({
      transactionId,
      orderStatus: orderStatus.value,
      shippedStatus:shippedStatus.value,
      shipper:selectShipper.value,
      followCode: followCode.value
    }).subscribe(res=> {
      alert(res.success)
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })

  }
  applyFilterChanges(){
    const currentQuery = this.query;
    this.query += `sortBy=${this.sortByDate}`;
    switch (this.completeStatus) {
      case "true":
        this.query += `&complete=true`
        break;
      case "false":
        this.query += `&complete=false`
        break
        case "all":
        this.query 
        break
      default:
        break;
    }
    this.service.getAllTransactions(this.query).subscribe(res=> {
      this.transactions = res.data
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })
    this.query = currentQuery

  }
  completeReturnOrder(i: number, returnSelect: HTMLSelectElement){
    if(returnSelect.value != "none"){
      const data = {
        orderId: this.transactions[i].order._id,
        returnStatus: returnSelect.value,
        info: {
          locale: navigator.language.toLowerCase(),
          conversationId: uuidv4(),
          paymentTransactionId: this.transactions[i].order.paymentTransactionId,
          price: this.transactions[i].order.amount.toString(),
          currency: navigator.language.toLowerCase(),
          ip: this.transactions[i].order.customer.ip
        }
    }

      this.orderService.completeReturn(data).subscribe(result=> {
        console.log(result);
      })
    
    }else{
      this.alertifyService.warning("lütfen geri ödeme onayı seçiniz.")
    }
   
  }
  ngOnInit(): void {
  }

}
