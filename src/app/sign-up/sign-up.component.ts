import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'ac-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private router: Router,
    private UserService:UserService
  ) { }

  ngOnInit(): void {
  }
  signup(form: NgForm): void{
    const { email, password } = form.value;
    console.log(form.value);
    this.UserService.create(email, password)
      .then(() => this.router.navigateByUrl('/users/new'))
      .catch((error:any) => console.log(error));
  }

}
