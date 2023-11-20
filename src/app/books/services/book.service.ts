import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookDetailsModel } from '../models/book-details-model';
import { BookSearchModel } from '../models/book-search-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiURL: string = `${environment.apiUrl}/api/Books`
  constructor(
    private readonly http:HttpClient
  ) { }

  getAll():Observable<BookDetailsModel[]>{
    return this.http.get<BookDetailsModel[]>(this.apiURL, {
      headers: { Authorization: "Bearer " + localStorage.getItem("UserToken2") }
    });
  }
  getById(id:number):Observable<BookDetailsModel>{
    return this.http.get<BookDetailsModel>(this.apiURL + `/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("UserToken2") }
    });
  }
  Update(model: FormData): Observable<any>{
    debugger;
    console.log("upService", model)
    // return this.http.put(this.apiURL + `/${model.id}` , model);
    return this.http.put(this.apiURL + `/${model.get('id')}` , model, {
      headers: { Authorization: "Bearer " + localStorage.getItem("UserToken2") }
    });
  }
  Delete(id : number): Observable<any>{
    return this.http.delete(this.apiURL + `/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("UserToken2") }
    });
  }
  Search(model:BookSearchModel | null):Observable<BookDetailsModel[]>{
    console.log("service api" , {Authorization: "Bearer " +localStorage.getItem("UserToken2")});
    console.log(localStorage.getItem("UserToken2"))
    return this.http.post<BookDetailsModel[]>(this.apiURL + '/search', model, {
      headers: { Authorization: "Bearer " + localStorage.getItem("UserToken2") }
    });
  }
  Insert(model: FormData){
    console.log(model)
    return this.http.post(this.apiURL , model, {
      headers: { Authorization: "Bearer " + localStorage.getItem("UserToken2") }
    });
  }
}
