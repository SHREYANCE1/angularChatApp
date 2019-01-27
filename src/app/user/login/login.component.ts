import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email :any;
  public password : any;

  constructor(
    public appService : AppService,
    public router : Router
    //implent for toastr
  ) { 
    
  }

  ngOnInit() {
  }

  //method to redirect to sign-up
  public goToSignup : any = () => {
    this.router.navigate(['/sign-up']);
  }//end to sign up

  //method to login
  public signinFunction : any = () => {

    if(!this.email){
      alert("enter email")
    } else if (!this.password) {
      alert("enter password")
    } else {
      let data = {
        email : this.email,
        password : this.password
      }
      console.log(data)
      this.appService.signinFunction(data).subscribe(

        (apiResponse) => {
          console.log(apiResponse)
          if(apiResponse.status === 200){

            Cookie.set('authtoken',apiResponse.data.authToken);

            Cookie.set('receiverId',apiResponse.data.userDetails.userId);

            Cookie.set('receiverName',apiResponse.data.userDetails.firstName+' '+apiResponse.data.userDetails.lastName);
            
            this.appService.setUserInfoFromLocalStorage(apiResponse.data.userDetails);

            this.router.navigate(['/chat']);
            alert('logged in')
          } else {
            alert("cannot log in")
            //alert(apiResponse.message)
          }
        }, (err) => {
          alert("some error occured")
        }
      )
    }
  }
}
