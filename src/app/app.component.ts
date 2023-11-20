import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Bookstore.FE';
  router: string;
  IsLoggedIn:boolean = false;

  constructor(
    public _router: Router
  )
  {
    this.router = _router.url;
  }
  ngOnInit(): void {
    let token = localStorage.getItem('UserToken2');
    if (token) {
        this.IsLoggedIn= true;
      }
  }
  login(){
    this._router.navigateByUrl('login');
  }
  logout(){
    localStorage.removeItem('UserToken2');
  }
  signup(){
    this._router.navigateByUrl('signup');
  }
}
