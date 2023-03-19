import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  password: String="";
  constructor(private service: ApiService, private router: Router) { }

  login(){
    this.service.login({model:"customer", email:this.email, password:this.password}).subscribe((result)=> {
      this.user = result
      localStorage.setItem("access_token",`${result.access_token}`)
      localStorage.setItem("user", `${result.data.name}`)
      this.router.navigate(["/"])
    })
  }
  
  ngOnInit(): void {
  }

}
