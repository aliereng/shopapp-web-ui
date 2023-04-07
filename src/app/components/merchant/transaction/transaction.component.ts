import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Shipper } from 'src/app/models/Shipper';
import { Transaction } from 'src/app/models/Transaction';
import { MerchantService } from 'src/app/services/merchant.service';
import { ShipperService } from 'src/app/services/shipper.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions!: [Transaction]
  shippers!: [Shipper]
  constructor(private service: MerchantService, private shipperService: ShipperService) { 
    this.service.getAllTransactions().subscribe(res=> {
      this.transactions = res.data
      console.log(this.transactions);
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
  ngOnInit(): void {
  }

}
