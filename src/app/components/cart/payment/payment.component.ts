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
  addressIndex!:number;
  transferAddress?: Address;
  billAddress?: Address;
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
  selectedAddress(index:number, element:HTMLInputElement){
    element.checked = true;
    // if(this.transferAddress && this.billAddress){
    //   element.checked = false
    // }
    if(this.transferAddress == null){
      this.transferAddress = this.addresses[index];
      this.addressIndex = index;
      document.getElementById("addressBox")!.setAttribute("style","animation-name:disableAddressArea");
      document.getElementById("transferAreaDown")!.setAttribute("style","display:block");
    }
    if(this.addressIndex != index){
      this.billAddress = this.addresses[index];
      document.getElementById("addressBox")!.setAttribute("style","animation-name:disableAddressArea");
      document.getElementById("billAreaDown")!.setAttribute("style","display:block");
      element.checked = false

    }
    if(this.addressIndex == index){
      this.billAddress = this.addresses[index];
      document.getElementById("addressBox")!.setAttribute("style","animation-name:disableAddressArea");
      document.getElementById("billAreaDown")!.setAttribute("style","display:none");
      element.checked = true

    }
  }
 
  showAddressPanel(){
    document.getElementById("addressBox")!.setAttribute("style","animation-name:showAddressArea");

  }
  showBillSendAddress(element:HTMLInputElement){
    if(!element.checked){
      document.getElementById("selectedBillAddressArea")!.setAttribute("style","display:block");
    }
    else{
      document.getElementById("selectedBillAddressArea")!.setAttribute("style","display:none");
      this.billAddress = this.transferAddress
    }
  }
  ngOnInit(): void {
   
  }

}
