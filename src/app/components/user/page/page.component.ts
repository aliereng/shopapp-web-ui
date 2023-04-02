import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  name!: String;
  surname!: String;
  email!:String;
  phoneNumber!:String;
  currentPassword!:String;
  newPassword!: String;
  newPasswordAgain!: String;
  customer!: Customer;
  constructor(private service:ApiService) {
    this.service.getCustomer().subscribe((response:HttpResponse<any>) => {
      this.name = response.body.data.name
      this.surname = response.body.data.surname
      this.email = response.body.data.email
      this.phoneNumber = response.body.data.phone
      this.customer = response.body.data
    },(error:HttpErrorResponse)=>{
      alert(error.error.message)
    })
    
  }
  updateInfo(){
    this.customer.name = this.name;
    this.customer.surname=this.surname;
    this.customer.email = this.email;
    this.customer.password = this.newPassword
    this.customer.phone = this.phoneNumber
    this.service.updateCustomer(this.customer).subscribe((response:HttpResponse<any>)=>{
      alert(response.body.message)
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })
  }
  updatePassword(){
    if(this.newPassword === this.newPasswordAgain){
      this.customer.password = this.newPassword
    this.service.updateCustomer(this.customer).subscribe((response:HttpResponse<any>)=>{
      alert(response.body.message)
      this.newPassword = "";
      this.newPasswordAgain = "";
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })
    }else{
      alert("parolalar aynı değil");
    }
  }
  ngOnInit(): void {
  }

}
