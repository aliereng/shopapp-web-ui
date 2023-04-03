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
    this.disableUpdateAddressPanel();
  }
  addresses: Array<Address> = []
  constructor(private service: AddressService) { 
    this.service.getAddress().subscribe(response=> {
      this.addresses = response.data
      
    },(error:HttpErrorResponse)=> {
      alert(error.status +" - "+error.error.message)
      window.location.replace("/login");
    })
  }
  remove(address:Address, index:number){
    this.service.removeAddress(address._id).subscribe(res=>{
      
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })
    document.getElementsByClassName("item")[index].innerHTML = "";
    document.getElementsByClassName("item")[index].setAttribute("style","border:none");
    window.location.reload();
  }

  ngOnInit(): void {
  }
  showAddAddressPanel(){
    
    document.getElementById("addAddressPanel")?.setAttribute("style","visibility:visible")
  }
  disableAddAddressPanel(){
    document.getElementById("addAddressPanel")?.setAttribute("style","visibility:hidden")

  }
  showUpdateAddressPanel(){
    
    document.getElementById("updateAddressPanel")?.setAttribute("style","visibility:visible")
  }
  disableUpdateAddressPanel(){
    document.getElementById("updateAddressPanel")?.setAttribute("style","visibility:hidden")

  }

}
