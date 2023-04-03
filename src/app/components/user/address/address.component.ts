import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Address } from 'src/app/models/Address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.disableAddAddressPanel();
  }
  addresses: Array<Address> = []
  constructor(private service: AddressService) { 
    this.service.getAddress().subscribe(response=> {
      this.addresses = response.data
      
    },(error:HttpErrorResponse)=> {
      alert(error.status +" - "+error.error.message)
    })
  }
  remove(address:Address, index:number){
    this.service.removeAddress(address._id).subscribe(res=>{
      
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })
    document.getElementsByClassName("item")[index].innerHTML = "";
    document.getElementsByClassName("item")[index].setAttribute("style","border:none");
  }

  ngOnInit(): void {
  }
  showAddAddressPanel(){
    document.getElementById("addAddressPanel")?.setAttribute("style","visibility:visible")
  }
  disableAddAddressPanel(){
    document.getElementById("addAddressPanel")?.setAttribute("style","visibility:hidden")

  }

}
