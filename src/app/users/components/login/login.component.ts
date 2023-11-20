import { Component } from '@angular/core';
import { LoginModel } from '../../models/Login-model';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginModel: LoginModel = new LoginModel();

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  onSubmit() {
    console.log('Login form submitted:', this.loginModel);

    this.usersService.login(this.loginModel).subscribe(
      (data: any) => {
        console.log(data);
        //TODO: save token
        // localStorage.setItem("UserToken", data.token);
        localStorage.setItem("UserToken2", data.token);
        this.router.navigateByUrl('books/list');
      },
      (error: any) => {
        console.error('error on user logIn' , error);
      }
    )
  }
}
