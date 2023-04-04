import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/Address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  addresses: Array<Address> =[]
  transferAddress!: String;
  billAddress!: String;
  cbBillAddressisChecked: Boolean=true
  paymentStatus:Boolean = false;
  constructor(private addressService:AddressService) { 
    this.addressService.getAddress().subscribe(response=> {
      this.addresses = response.data
    },(error:HttpErrorResponse)=> {
      alert("Adresler getirilemedi: "+ error.error.message)
      window.location.replace("/login");
    })
  }
  selectedAddress(address:Address, element:HTMLInputElement){
    element.checked = true
    this.transferAddress = address._id;
    if(!this.selectedBillAddress){
      this.billAddress = address._id;
    }
  }
  selectedBillAddress(){
  }
  
  ngOnInit(): void {

  }

}
