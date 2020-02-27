import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


import { DashboardService } from '../service/dashboard.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private service:DashboardService, private router:Router ) { }

  ngOnInit(): void {
    this.tags()
  }
  
  public tag=[];
  public rooms=[];
  public users=[];

  tags()
  {
    this.service.getTrending()
    .subscribe((res)=>
    {
      this.tag=res['tags'];
      this.rooms=res['rooms']
      this.users=res['users']
      console.log(res)
    },(err)=>
    {
      console.log(err);
    })
  }

  goToRoom(roomid)
  {
    this.router.navigate([`/room/${roomid}`])
  }

}
