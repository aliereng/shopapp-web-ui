import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  newPassword!: String;
  newPasswordAgain!: String;
  resetPasswordToken!:String;
  constructor(private service:ApiService, private router:Router, private activatedRoute: ActivatedRoute) { 
    this.resetPasswordToken = this.activatedRoute.snapshot!.queryParams['resetPasswordToken']!;
  }
  send(){
    this.service.resetPassword({model:"customer", password: this.newPassword!}, this.resetPasswordToken).subscribe(result => {
      alert(result.message);
      this.router.navigate(["/login"])
    })
  }
  ngOnInit(): void {
  }

}
