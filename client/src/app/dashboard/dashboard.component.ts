import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private service:DashboardService ) { }

  ngOnInit(): void {
    this.tags()
  }

  tags()
  {
    this.service.getTrending()
    .subscribe((res)=>
    {
      console.log(res);
    },(err)=>
    {
      console.log(err);
    })
  }

}
