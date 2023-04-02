import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/Address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addresses: Array<Address> = []
  constructor(private service: AddressService) { 
    this.service.getAddress().subscribe(response=> {
      this.addresses = response.data
      
    },(error:HttpErrorResponse)=> {
      alert(error.status +" - "+error.error.message)
    })
  }

  ngOnInit(): void {
  }

}
