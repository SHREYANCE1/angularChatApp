import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from './../../socket.service'
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ChatMessage } from './chat';
import { CheckUser } from 'src/app/CheckUser';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit, CheckUser {

  @ViewChild( 'scrollMe', { read : ElementRef})

  public scrollMe : ElementRef;

  public authToken : any;
  public userInfo : any;
  public userList : any = [];
  public disconnectedSocket : boolean;

  public scrollToChatTop : boolean = false;

  
  public receiverId : any;
  public receiverName : any;
  public previousChatList: any = [];
  public messageText : any;
  public messageList: any = []; //stores the current message lis displayed
  public pageValue : number = 0;
  public loadingPreviousChat: boolean = false;

  constructor(
    public AppService : AppService,
    public SocketService : SocketService,
    public router : Router
  ) { 
    this.receiverId = Cookie.get('receiverId');
    this.receiverName = Cookie.get('receiverName');
    console.log("chat-box component is called")
    console.log(this.receiverId);
    console.log(this.receiverName)
  }

  ngOnInit() {

    this.authToken = Cookie.get('authtoken');

    this.userInfo = this.AppService.getUserInfoFromLocalStorage();

    this.checkStatus();

    this.verifyUserConnection();

   // this.getOnlineUserList();

    this.getMessageFromUser();
    console.log("in ngoninit of chat-box")

  }
  
  public checkStatus : any = () => {
    if(this.authToken === '' || this.authToken === undefined || this.authToken === null){

      this.router.navigate(['/']);
      console.log('status of authtoken : false')
      return false;
    } else {
      console.log('status of authtoken : true')
      return true;
    }

  } // end check status

  public verifyUserConnection : any = () => {
  
    this.SocketService.verifyUser().subscribe (
      
      (data) => {
        this.disconnectedSocket = false;

        this.SocketService.setUser(this.authToken);
        this.getOnlineUserList();
      }
    )
  } // verify user confirmation ends

  public getOnlineUserList : any = () => {

    this.SocketService.onlineUserList().subscribe(

      (userList) => {
        this.userList = [];
        for(let x in userList){
          let temp = {'userId' : x, 'name' : userList[x], 'unread' : 0, 'chatting' : false}
          this.userList.push(temp);
        }
        console.log('user list :')
        console.log(userList)
      }); // end online-user-list
  }

  public sendMessageUsingKeypress : any = (event : any) => {

    if(event.keyCode === 13){   //13 is the keycode for enter
      
      this.sendMessage();
    }
  }

  public sendMessage : any = () => {

    if(this.messageText) {
      
      let chatMessageObject : ChatMessage = {
        senderName: this.userInfo.firstName+ ' '+ this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: Cookie.get('receiverName'),
        receiverId: Cookie.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
    } // end chatMessageObject
    console.log(chatMessageObject);
    this.SocketService.sendChatMessage(chatMessageObject)
    this.pushToChatWindow(chatMessageObject)
    }
    else {
      alert('text message cannot be empty')
    }

  } // end send message

  public pushToChatWindow : any = (data) => {
    this.messageText = '';
    this.messageList.push(data);
    this.scrollToChatTop = false;
  }

  public getMessageFromUser : any = () => {

    this.SocketService.chatByUserId(this.userInfo.userId).subscribe(
      (data) => {
       // alert('message received');
        (this.receiverId == this.userInfo.userId)?this.messageList.push(data):'';
        //alert(`${data.senderName} says: ${data.message}`); insert a toast
        this.scrollToChatTop = false;
        this.messageList.push(data);
      }
    )
  } // end get message from user

  public userSelectedToChat : any = (id, name ) => {
    console.log('setting user as active')
    //setting that user to chatting true
    this.userList.map((user) => {
      if(user.userId == id){
        user.chatting = true;
      } else {
        user.chatting = false;
      }
    })

    Cookie.set('receiverId', id)
    Cookie.set('receiverName', name)

    this.receiverName = name;
    this.receiverId = id;
    this.messageList = [];

    let chatDetails = {
      userId: this.userInfo.userId,
      senderId : id
    }
    this.SocketService.markChatAsSeen(chatDetails);
    this.getPreviousChatWithUser();
  } // end user btn click function

  public getPreviousChatWithUser = () => {
    let previousData = (this.messageList.length > 0 ? this.messageList.slice() : [] )
    this.SocketService.getChat(this.userInfo.userId, this.receiverId , this.pageValue*10).subscribe(
      (apiResponse) => {
        console.log(apiResponse)
        if(apiResponse.status == 200){
          this.messageList = apiResponse.data.concat(previousData);
        } else {
          this.messageList = previousData;
          alert('no messages available')
        }
        this.loadingPreviousChat = false
      }, (err) => {
        alert('some error occured')
      });
  } // end get previous chat with any user


  public loadEarlierPageOfChat : any = () => {
    this.loadEarlierPageOfChat = true
    this.pageValue++;
    this.scrollToChatTop = true;
    this.getPreviousChatWithUser();
  } // end load previous 10 messages

  public logout = () => {
    this.AppService.logout(this.userInfo.userId).subscribe(
    (apiResponse)=> {
      if(apiResponse.status == 200){
        console.log('logout called')
        Cookie.delete('authToken')
        Cookie.delete('receiverId')
        Cookie.delete('receiverName')
        this.SocketService.exitSocket()
        this.router.navigate(['/'])
      } else {
        alert(apiResponse.message)
      } //end condition
    });
  } // end logout

  //handle the output from a child component
  public showUserName = (name:string) => {
    alert('You are chatting with'+name)
  }
}
