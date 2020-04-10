import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public errorMsg:string;
  public successMsg:string;
  constructor(public userService:UserService,public router:Router) { }

  ngOnInit(): void {
  }
  register(registerForm:NgForm){
    if(registerForm.valid){
      const user =registerForm.value;
      this.userService.register(user)
      .subscribe(
        (res:HttpResponse<object>)=>{
          this.successMsg=res['message'];
          setTimeout(() => {
            this.router.navigate(['login'])
          }, 2000);
        },
        (error:HttpErrorResponse)=>{
          this.errorMsg=error['error']['message'];
          setTimeout(() =>  this.errorMsg="" , 2000);
        }
      )
    }
  }
}

