import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import{ HttpClient,HttpClientModule, HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public url = 'https://chatapi.edwisor.com';
  private socket;
  public authToken = Cookie.get('authtoken')
  constructor(public http: HttpClient) { 
    //connection is being created
    //that handshake with the server verifying the credentials
    this.socket = io(this.url)
    console.log(this.socket)
  }

  //events to be listened

  public verifyUser = () =>{
      
    return Observable.create((observer) => { //this observable gets updated , all those subscribed get io


      this.socket.on('verifyUser', (data) => { //listen to the event , capture the output in var data
        
        observer.next(data);  //push the new out in data in observable , 
      }); //end socket

    }); //end observable

  }//end verifyUser

  public onlineUserList = () => {

    return Observable.create((observer) => {
      this.socket.on('online-user-list', (userList) => {
        observer.next(userList)
      }); //end socket
    }); // end observable
  }

  public disconnectedSocket = () => {
    return Observable.create((observer) => {
      this.socket.on('disconnect', () => {
        observer.next();
      }); //end socket
    }); //end obsrevable
  }// end disconnected socket

 // api to get paginated chat
   public getChat(senderId,receiverId,skip) :Observable<any> {
     return this.http.get(this.url+'/api/v1/chat/get/for/user/?senderId='+senderId+'&receiverId='+receiverId+'&skip='+skip+'&authToken='+this.authToken)
     .do(data => console.log('Data received'))
     .catch(this.handleError)
   }

  public chatByUserId = (userId) => {
    return Observable.create((observer) => {
      this.socket.on(userId, (data) => {
        observer.next(data);
      }); // end socket
    }); // end observable
  }


  //events to  emit

  public setUser = (authToken) => {

    this.socket.emit('set-user',authToken);
  } // end setuser

  public markChatAsSeen = (userDetails) => {

    this.socket.emit("set-mark-chat-as-seen",userDetails)
  }// end mark chat as seen 

  public sendChatMessage = (chatMessageObject) => {
    this.socket.emit('chat-msg', chatMessageObject)
  }
  //end events to be emitted

  public exitSocket = () => {
    this.socket.disconnect();
  }

  private handleError(err : HttpErrorResponse) {
    let errorMessage = "";
    
    if(err.error instanceof Error) {
      errorMessage=`An error occured ${err.error.message}`
    } else {
      errorMessage =`Server returned code : ${err.status}, error mesage is ${err.error.message}`
    } // end conditon if

    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }// END HANDLE ERROR
}
