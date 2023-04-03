import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  address!: Address
  constructor(private service:AddressService, private router:Router) { 

  }

  ngOnInit(): void {
  }

  addAddress(){
    this.address.title = this.title;
    this.address.info.addressDesc = this.addressDesc;
    this.address.info.name = this.name;
    this.address.info.surname = this.surname;
    this.address.info.city = this.city;
    this.address.info.district = this.district;
    this.address.info.neighbourhood = this.neighbourhood;
    this.address.info.street = this.street;
    this.address.info.postalCode = this.postalCode;
    this.address.info.phone = this.phone;
    this.service.addAddress(this.address).subscribe(res=> {

    },(error:HttpErrorResponse)=> {
      alert(error.error.models)
    })
    this.router.navigate(["/user/address"]);
    

  }
}
