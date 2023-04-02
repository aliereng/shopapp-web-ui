import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  seachText: String = "";
  text: String = localStorage.getItem("access_token") != "" ? "Hesabım": "Giriş Yap";
  model!:String;
  constructor(private cookieService: CookieService) {
    this.model = localStorage.getItem("modelType")!;
  }

  ngOnInit(): void {
  }
  logout(){
    localStorage.setItem("access_token","");
    localStorage.setItem("userType","");
    this.cookieService.deleteAll();
    window.location.replace("/");
    
  }
}
