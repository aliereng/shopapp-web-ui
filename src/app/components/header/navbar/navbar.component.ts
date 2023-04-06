import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  seachText: String = "";
  text!: String;
  model!:String;
  constructor() {
    this.model = localStorage.getItem("modelType")!;
    // window.onunload = ()=>{
    //   localStorage.setItem("access_token","");
    //   localStorage.setItem("userType","");
    // }
  }

  ngOnInit(): void {
    this.text =  localStorage.getItem("access_token") != "" ? "Hesabım": "Giriş Yap";
  }
  checkUser(){
    if(localStorage.getItem("access_token") == ""){
      window.location.replace("/login")
    }
  }
  logout(){
    localStorage.setItem("access_token","");
    localStorage.setItem("userType","");
    window.location.replace("/");
    
  }
}
