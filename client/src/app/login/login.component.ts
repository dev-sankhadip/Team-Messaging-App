import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../service/http.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private UserService:HttpService, private router:Router ) { }

  loginForm=new FormGroup({
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  }

  submit()
  {
    this.UserService.login(this.loginForm.value)
    .subscribe((res)=>
    {
      window.localStorage.setItem("token",res['token'])
      this.router.navigate(['user'])
    },(err)=>
    {
      console.log("error");
      console.log(err);
    })
  }

  goSignup()
  {
    this.router.navigate(['signup']);
  }

}
