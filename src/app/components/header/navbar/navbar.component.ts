import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  seachText: String = "";
  text: String = localStorage.getItem("access_token") != "" ? localStorage.getItem("user")!: "giriş yap"
  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }
  logout(){
    localStorage.setItem("access_token","");
    localStorage.setItem("user","");
    this.cookieService.deleteAll();
    window.location.replace("/");
    
  }
}
