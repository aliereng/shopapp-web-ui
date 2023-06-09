import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  mainCategories: Array<Category> = [];
  categories!: [Category];
  model:String;
  constructor(private service: ApiService) {
    this.model = localStorage.getItem("modelType")!;
    console.log(this.model)


    this.service.getAllCategory().subscribe(res=> {
      res.data.map(category=> {
        if(category.parentId == "null"){
          this.mainCategories.push(category)
        }  
      })
    })
  }

  ngOnInit(): void {
  }

}
