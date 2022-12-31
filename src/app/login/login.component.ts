import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../models/User';
import {APIService } from '../Services/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin : boolean = true;
  user: User = new User();

  constructor(private apiService : APIService, private router: Router) { }

  ngOnInit(): void {
  }

  continue(){
    if(this.isLogin){
      this.apiService.login(this.user).then(res=>{
        this.router.navigateByUrl("/appointment-list");
        },err => {
          console.log(err);
        });
    } else {
      this.apiService.register(this.user).then(res=>{
        this.router.navigateByUrl("/appointment-list");
        },err => {
          console.log(err);
        });
    }

  }

}
