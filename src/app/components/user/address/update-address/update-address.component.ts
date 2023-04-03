import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/models/Address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})

export class UpdateAddressComponent implements OnInit {
  _id!:String;
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
  @Input() address!:Address
  constructor(private service: AddressService) { 
    
    
  }

  ngOnInit(): void {
    this._id=this.address._id;
    this.title = this.address.title;
    this.name = this.address.info.name;
    this.surname = this.address.info.surname;
    this.phone = this.address.info.phone;
    this.city = this.address.info.city;
    this.district = this.address.info.district;
    this.neighbourhood = this.address.info.neighbourhood;
    this.street = this.address.info.street;
    this.postalCode = this.address.info.postalCode;
    this.addressDesc = this.address.info.addressDesc;
  
  }
  updateAddress(){
    const address = {
      _id:this._id,
      title: this.title,
      info:{
        name:this.name,
        surname:this.surname,
        phone:this.phone,
        city:this.city,
        district:this.district,
        neighbourhood:this.neighbourhood,
        street:this.street,
        postalCode:this.postalCode,
        addressDesc:this.addressDesc
      }
    }
    this.service.updateAddress(address, this._id).subscribe(res=>{
      document.getElementById("updateAddressPanel")?.setAttribute("style","visibity:hidden");
      window.location.reload();
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
  }

}
