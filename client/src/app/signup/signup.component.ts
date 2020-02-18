import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { HttpService } from '../service/http.service'
import { passwordValidator } from '../validators/passwordValidator';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private UserService:HttpService, private router:Router ) { }

  signupForm=new FormGroup({
    username:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.email]),
    region:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required, passwordValidator])
  })



  ngOnInit(): void {
  }

  submit()
  {
    this.UserService.signup(this.signupForm.value);
  }

  goLogin()
  {
    this.router.navigate(['login'])
  }

  get password()
  {
    return this.signupForm.get('password');
  }

}
