import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user!: Login;
  email: String = "";
  password: String = "";
  model: String = "customer";
  forgotStatus: Boolean = true;
  forgotEmail: String = "";
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.forgotStatus = false;
    this.showForgotPasswordArea();
  }
  constructor(private service: ApiService, private router: Router, private cookieService: CookieService) { }

  login() {
    this.service.login({ model: "customer", email: this.email, password: this.password }).subscribe((result) => {
      this.user = result
      this.cookieService.set("access_token", `${result.access_token}`)
      localStorage.setItem("access_token", `${result.access_token}`)
      localStorage.setItem("user", `${result.data.name}`)
      window.location.replace("/");
    },(error:HttpErrorResponse)=>{
      alert(error.error.message);
    })
  }
  forgotPassword() {
    const send = {
      model: this.model,
      email: this.forgotEmail
    }
    this.service.forgotPassword(send).subscribe(res => {
      alert(res.message)
      document.getElementById("forgotPassword")?.setAttribute("style","display:none")
      this.forgotEmail = "";
      this.forgotStatus=true;
    })
    // this.router.navigate(["/resetpassword"]);


  }
  showForgotPasswordArea() {
    if(this.forgotStatus){
      document.getElementById("forgotPassword")?.setAttribute("style","display:flex")
      this.forgotStatus=false;
    }else{
      document.getElementById("forgotPassword")?.setAttribute("style","display:none")
      this.forgotEmail = "sisteme kayıtlı mail adresinizi giriniz.";
      this.forgotStatus=true;
    }
  }
  ngOnInit(): void {

  }

}
