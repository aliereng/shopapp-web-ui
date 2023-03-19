import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // seachText: String = "";
  // text: String = localStorage.getItem("access_token") != ""? localStorage.getItem("user")!: "giriş yap"
  constructor() { }

  ngOnInit(): void {
  }
  // logout(){
  //   localStorage.setItem("access_token","");
  //   localStorage.setItem("user","");
  //   window.location.replace("/");
  // }
}
