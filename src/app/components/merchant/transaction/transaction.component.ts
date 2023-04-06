import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions!: [Transaction]
  constructor(private service: MerchantService) { 
    this.service.getAllTransactions().subscribe(res=> {
      this.transactions = res.data
      console.log(this.transactions);
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })
  }

  ngOnInit(): void {
  }

}
