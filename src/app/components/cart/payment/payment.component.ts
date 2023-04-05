import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
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
  billAddressCheckedInput!:Boolean;
  gonderimMi!: Boolean;
  paymentSecure3DCheck!:Boolean;
  amount!:number;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    document.getElementById("addAddressArea")?.setAttribute("style","display:none")

  }

  constructor(private addressService:AddressService, private service:ApiService) { 
    this.addressService.getAddress().subscribe(response=> {
      this.addresses = response.data
      
    },(error:HttpErrorResponse)=> {
      alert("Adresler getirilemedi: "+ error.error.message)
      window.location.replace("/login");
    })
    this.amount = Number(localStorage.getItem("cartAmount"));
  }

  selectedAddress(selectAddress:Address, element:HTMLInputElement){
    document.getElementById("addAddressArea")?.setAttribute("style","display:none")

    if(this.transferAddress == null && this.billAddressCheckedInput){
      this.transferAddress = selectAddress;
      this.billAddress = selectAddress;
      element.checked = true
      document.getElementById("addressBox")!.setAttribute("style","animation-name:disableAddressArea");
      document.getElementById("transferAreaDown")!.setAttribute("style","display:block");
    }
    if(this.transferAddress == selectAddress && element.checked){
      this.transferAddress = selectAddress;
      this.billAddress = selectAddress;
      element.checked = true
      document.getElementById("addressBox")!.setAttribute("style","animation-name:disableAddressArea");
      document.getElementById("transferAreaDown")!.setAttribute("style","display:block");
    }
    if(this.transferAddress != null &&this.transferAddress._id !=selectAddress._id && element.checked){
      this.transferAddress = selectAddress;
      this.billAddress = selectAddress;
      document.getElementById("addressBox")!.setAttribute("style","animation-name:disableAddressArea");
      document.getElementById("transferAreaDown")!.setAttribute("style","display:block");
    }
    if(!element.checked){
      document.getElementById("selectedBillAddressArea")!.setAttribute("style","display:block");
    }
    if(!element.checked && this.billAddress && !this.gonderimMi ){
      this.billAddress = selectAddress;
      document.getElementById("addressBox")!.setAttribute("style","animation-name:disableAddressArea");
      document.getElementById("billAreaDown")!.setAttribute("style","display:block");
    }
    if(!element.checked && this.transferAddress != selectAddress && this.gonderimMi){
      this.transferAddress = selectAddress;
      document.getElementById("addressBox")!.setAttribute("style","animation-name:disableAddressArea");
      document.getElementById("billAreaDown")!.setAttribute("style","display:block");
    }
  }
 
  showAddressPanel(element:HTMLElement){
    document.getElementById("addressBox")!.setAttribute("style","animation-name:showAddressArea");
    if(element.innerHTML.includes("Gönderim")){
      this.gonderimMi = true;
    }else{
      this.gonderimMi = false;
    }
  }
  showBillSendAddress(element:HTMLInputElement){
    if(!element.checked){
      document.getElementById("selectedBillAddressArea")!.setAttribute("style","display:block");
      this.billAddress = this.transferAddress;
    }
    else{
      document.getElementById("selectedBillAddressArea")!.setAttribute("style","display:none");
      this.billAddress = this.transferAddress
    }

  }
  ngOnInit(): void {
   this.billAddressCheckedInput = true
   this.paymentSecure3DCheck = true
  }
  showAddAddressArea(){
    document.getElementById("addAddressArea")?.setAttribute("style","display:flex")
    document.getElementById("transferAreaDown")?.setAttribute("style","display:none")
    document.getElementById("selectedBillAddressArea")?.setAttribute("style","display:none")
    document.getElementById("paymentArea")?.setAttribute("style","display:none")

  }
  applyCart(){
    this.service.completeCart({deliveredAddress:this.transferAddress?._id, invoiceAddress:this.billAddress?._id}).subscribe((res:HttpResponse<any>)=> {
      window.location.replace("/user/order")
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })

  }

}
