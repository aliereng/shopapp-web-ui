import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/Address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  name!: String;
  surname!: String;
  title!:String;
  phone!:String;
  city!: String;
  district!: String;
  neighbourhood!: String;
  street!: String;
  postalCode!: String;
  addressDesc!: String;
  constructor(private service:AddressService, private router:Router) { 
    
  }

  ngOnInit(): void {
  }

  addAddress(){
    const address = {
      title:this.title,
      info:{
        name:this.name,
        surname:this.surname,
        phone: this.phone,
        city:this.city,
        district:this.district,
        neighbourhood:this.neighbourhood,
        street: this.street,
        postalCode: this.postalCode,
        addressDesc: this.addressDesc
      }
    }
    this.service.addAddress(address).subscribe(res=> {
      document.getElementById("addAddressPanel")?.setAttribute("style","visibility:hidden");
      window.location.reload();
    },(error:HttpErrorResponse)=> {
      alert(error.error.models)
    })
    

  }
}
