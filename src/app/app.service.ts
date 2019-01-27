import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import{ HttpClient,HttpClientModule, HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'https://chatapi.edwisor.com';
  constructor(public http: HttpClient) { }

  //method to sign-up
  public signupFunction(data) : Observable<any> {
    const params = new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('mobile',data.mobile)
    .set('email',data.email)
    .set('password',data.password)
    .set('apiKey',data.apiKey);

    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  }//end of signup function

  //method to sign-in
  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
    .set('email',data.email)
    .set('password',data.password)

    return this.http.post(`${this.url}/api/v1/users/login`, params)
  }//end of signin function

  //method to get local storage
  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }//end getUserInfoFromLocalStorage

  //method to set local storage
  public setUserInfoFromLocalStorage = (data) => {
    localStorage.setItem('userInfo',JSON.stringify(data));
  }//end setUserInfoFromLocalStorage

  //method to logout
  public logout(userId) : Observable<any>   {
    return this.http.post('https://chatapi.edwisor.com/api/v1/users/logout',userId)
  }
}
