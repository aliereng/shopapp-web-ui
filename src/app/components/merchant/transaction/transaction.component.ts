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
  sortByDate = "default";
  completeStatus = "all";
  query = "?";
  constructor(private service: MerchantService, private shipperService: ShipperService) { 
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
  ngOnInit(): void {
  }

}
