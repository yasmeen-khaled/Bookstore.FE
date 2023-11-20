import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/Login-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURL: string = `${environment.apiUrl}/api/Users`
  constructor(
    private readonly http:HttpClient
  ) { }

  login(model: LoginModel): Observable<any>{
    return this.http.post(`${this.apiURL}/Login`, model);
  }
}
