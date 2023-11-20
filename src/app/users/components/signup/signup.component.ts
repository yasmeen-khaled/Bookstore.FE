import { Component } from '@angular/core';
import { SignupModel } from '../../models/Signup-model'
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  model: SignupModel = new SignupModel();

  roles: string[] = ['admin', 'user'];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  onSubmit() {
    console.log('Login form submitted:', this.model);

    this.usersService.signup(this.model).subscribe(
      (data: any) => {
        console.log(data);
        // localStorage.setItem("UserToken2", data.token);
        // this.router.navigateByUrl('books/list');
        this.router.navigateByUrl('login');
      },
      (error: any) => {
        console.error('error on user SignUp' , error);
      }
    )
  }
}
