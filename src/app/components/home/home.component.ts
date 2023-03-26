import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { HomepageModel } from 'src/app/models/HomepageModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homepageModel?: HomepageModel | undefined
  constructor(private service: ApiService) {
    this.service.getAllProducts().subscribe(res => {
      this.homepageModel = res;
    })
  }
  
  ngOnInit(): void {
  }

}
